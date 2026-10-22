import { appendFileSync, ensureDirSync, writeFileSync } from "fs-extra";
import path from "path";
import chalk from "chalk";
import { SCRIPTS_LOGS_DIR } from "shared";
import { FlowTypes } from "data-models";

export const FLOW_PARSER_PERF_LOG = path.resolve(SCRIPTS_LOGS_DIR, "flowParser.perf.log");

const PROGRESS_INTERVAL_FLOWS = 50;
const PROGRESS_INTERVAL_MS = 30_000;
const SLOW_FLOW_THRESHOLD_MS = 1000;

export function isFlowParserDebugEnabled(): boolean {
  const value = process.env.FLOW_PARSER_DEBUG;
  return value === "1" || value === "true" || value === "yes";
}

export function perfNow(): number {
  return performance.now();
}

export function formatDurationMs(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(1)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

export type IFlowParserInputTimings = {
  cacheEntryNameMs: number;
  cacheGetMs: number;
  processInputMs: number;
  cacheAddMs: number;
  totalMs: number;
  deferred?: boolean;
};

export type IFlowParserRunTimings = {
  cloneMs?: number;
  rowLoopMs?: number;
  postProcessRowMs?: number;
  postProcessFlowMs?: number;
  rowCount?: number;
  processedRowCount?: number;
  phases?: IPhaseTimings;
  slowRows?: Array<{ rowNumber: number; type?: string; ms: number }>;
};

export type IPhaseTimings = Record<string, number>;

/** Accumulates per-phase timings for a single flow parse */
export class FlowParserPhaseTracker {
  private phases: Record<string, number> = {};
  private slowRows: Array<{ rowNumber: number; type?: string; ms: number }> = [];

  time<T>(phase: string, fn: () => T): T {
    const start = perfNow();
    try {
      return fn();
    } finally {
      this.add(phase, perfNow() - start);
    }
  }

  add(phase: string, ms: number): void {
    this.phases[phase] = (this.phases[phase] ?? 0) + ms;
  }

  get(phase: string): number {
    return this.phases[phase] ?? 0;
  }

  recordSlowRow(row: { rowNumber: number; type?: string; ms: number }): void {
    this.slowRows.push(row);
    this.slowRows.sort((a, b) => b.ms - a.ms);
    if (this.slowRows.length > 5) {
      this.slowRows.length = 5;
    }
  }

  mergeNested(child: FlowParserPhaseTracker, prefix = "nestedGroup"): void {
    for (const { phase, ms } of child.getSorted()) {
      this.add(`${prefix}.${phase}`, ms);
    }
    for (const row of child.slowRows) {
      this.recordSlowRow(row);
    }
  }

  getSorted(): Array<{ phase: string; ms: number }> {
    return Object.entries(this.phases)
      .map(([phase, ms]) => ({ phase, ms }))
      .sort((a, b) => b.ms - a.ms);
  }

  toRecord(): IPhaseTimings {
    const record: IPhaseTimings = {};
    for (const { phase, ms } of this.getSorted()) {
      record[phase] = Math.round(ms * 10) / 10;
    }
    return record;
  }

  getSlowRows() {
    return this.slowRows;
  }
}

export function formatTopPhases(phases: IPhaseTimings | undefined, limit = 5): string {
  if (!phases || Object.keys(phases).length === 0) {
    return "";
  }
  return Object.entries(phases)
    .slice(0, limit)
    .map(([phase, ms]) => `${phase} ${formatDurationMs(ms)}`)
    .join(", ");
}

export type IFlowParserPerfEntry = {
  flow_name: string;
  flow_type: string;
  flow_subtype?: string;
  source_path?: string;
  source_url?: string;
  row_count?: number;
  source: "cache" | "processor" | "skipped";
  timings: IFlowParserInputTimings & { parser?: IFlowParserRunTimings };
};

export type IFlowParserPostProcessEntry = {
  phase: "postProcess";
  flow_type: string;
  flow_count: number;
  duration_ms: number;
};

type ISummaryData = {
  event: "progress" | "summary";
  timestamp: string;
  total_duration_ms: number;
  flow_count: number;
  queue_processed?: number;
  queue_total?: number;
  cache_hits: number;
  cache_misses: number;
  skipped_count: number;
  post_process_duration_ms: number;
  flows_per_second?: number;
  by_flow_type: Record<string, { count: number; totalMs: number; avg_ms: number; maxMs: number }>;
  slowest_flows: Array<{
    flow_name: string;
    flow_type: string;
    source: string;
    source_path?: string;
    row_count?: number;
    total_ms: number;
    process_input_ms: number;
    cache_entry_name_ms?: number;
    parser?: IFlowParserRunTimings;
  }>;
  post_process_by_type?: IFlowParserPostProcessEntry[];
  top_phases?: Array<{ phase: string; total_ms: number }>;
};

export class FlowParserPerfLogger {
  private static current: FlowParserPerfLogger | null = null;

  private entries: IFlowParserPerfEntry[] = [];
  private postProcessEntries: IFlowParserPostProcessEntry[] = [];
  private processStartMs = 0;
  private lastProgressMs = 0;
  private lastProgressFlowCount = 0;
  private queueProcessed = 0;
  private queueTotal = 0;
  private cacheHits = 0;
  private cacheMisses = 0;
  private skippedCount = 0;
  private globalPhaseTotals: Record<string, number> = {};

  public static setCurrent(logger: FlowParserPerfLogger | null): void {
    FlowParserPerfLogger.current = logger;
  }

  public static getCurrent(): FlowParserPerfLogger | null {
    return FlowParserPerfLogger.current;
  }

  public start(expectedFlowCount = 0): void {
    ensureDirSync(SCRIPTS_LOGS_DIR);
    writeFileSync(FLOW_PARSER_PERF_LOG, "");
    this.processStartMs = perfNow();
    this.lastProgressMs = this.processStartMs;
    this.lastProgressFlowCount = 0;
    this.queueTotal = expectedFlowCount;
    this.writeLine({
      event: "start",
      timestamp: new Date().toISOString(),
      expected_flow_count: expectedFlowCount,
      debug_enabled: isFlowParserDebugEnabled(),
    });
  }

  public updateQueueProgress(processed: number, total: number): void {
    this.queueProcessed = processed;
    this.queueTotal = total;
  }

  public recordFlow(entry: IFlowParserPerfEntry): void {
    this.entries.push(entry);
    if (entry.source === "cache") {
      this.cacheHits++;
    } else if (entry.source === "processor") {
      this.cacheMisses++;
    }
    if (entry.source === "skipped") {
      this.skippedCount++;
    }

    const shouldLogFlow =
      isFlowParserDebugEnabled() ||
      entry.timings.totalMs >= SLOW_FLOW_THRESHOLD_MS ||
      entry.source === "processor" ||
      entry.source === "skipped";
    if (shouldLogFlow) {
      this.writeLine({ event: "flow", ...entry });
    }

    if (entry.timings.totalMs >= SLOW_FLOW_THRESHOLD_MS) {
      this.printSlowFlowAlert(entry);
    }

    this.accumulatePhases(entry.timings.parser?.phases);
    this.maybeEmitProgress();
  }

  public accumulatePhases(phases?: IPhaseTimings): void {
    if (!phases) {
      return;
    }
    for (const [phase, ms] of Object.entries(phases)) {
      this.globalPhaseTotals[phase] = (this.globalPhaseTotals[phase] ?? 0) + ms;
    }
  }

  public recordPostProcess(entry: IFlowParserPostProcessEntry): void {
    this.postProcessEntries.push(entry);
    this.writeLine({ event: "postProcess", ...entry });
  }

  public recordPostProcessComplete(): void {
    this.emitProgress("postProcess");
  }

  public finish(): void {
    this.emitProgress("summary");
  }

  private maybeEmitProgress(): void {
    const now = perfNow();
    const flowsSinceLastProgress = this.entries.length - this.lastProgressFlowCount;
    const msSinceLastProgress = now - this.lastProgressMs;
    if (
      flowsSinceLastProgress >= PROGRESS_INTERVAL_FLOWS ||
      msSinceLastProgress >= PROGRESS_INTERVAL_MS
    ) {
      this.emitProgress("progress");
    }
  }

  private emitProgress(event: "progress" | "summary" | "postProcess"): void {
    const summary = this.buildSummary(event === "summary" ? "summary" : "progress");
    this.writeLine(summary);

    if (event === "summary") {
      this.printConsoleSummary(summary, true);
    } else {
      this.printConsoleSummary(summary, false);
    }

    this.lastProgressMs = perfNow();
    this.lastProgressFlowCount = this.entries.length;
  }

  private buildSummary(event: "progress" | "summary"): ISummaryData {
    const totalMs = perfNow() - this.processStartMs;
    const sortedByTotal = [...this.entries].sort((a, b) => b.timings.totalMs - a.timings.totalMs);
    const slowest = sortedByTotal.slice(0, 20);
    const byType: Record<string, { count: number; totalMs: number; maxMs: number }> = {};

    for (const entry of this.entries) {
      const bucket = byType[entry.flow_type] ?? { count: 0, totalMs: 0, maxMs: 0 };
      bucket.count++;
      bucket.totalMs += entry.timings.totalMs;
      bucket.maxMs = Math.max(bucket.maxMs, entry.timings.totalMs);
      byType[entry.flow_type] = bucket;
    }

    const postProcessTotalMs = this.postProcessEntries.reduce((sum, e) => sum + e.duration_ms, 0);
    const flowsPerSecond = totalMs > 0 ? (this.entries.length / totalMs) * 1000 : 0;

    return {
      event,
      timestamp: new Date().toISOString(),
      total_duration_ms: totalMs,
      flow_count: this.entries.length,
      queue_processed: this.queueProcessed || undefined,
      queue_total: this.queueTotal || undefined,
      cache_hits: this.cacheHits,
      cache_misses: this.cacheMisses,
      skipped_count: this.skippedCount,
      post_process_duration_ms: postProcessTotalMs,
      flows_per_second: flowsPerSecond,
      by_flow_type: Object.fromEntries(
        Object.entries(byType).map(([flowType, stats]) => [
          flowType,
          {
            ...stats,
            avg_ms: stats.count > 0 ? stats.totalMs / stats.count : 0,
          },
        ])
      ),
      slowest_flows: slowest.map((entry) => ({
        flow_name: entry.flow_name,
        flow_type: entry.flow_type,
        source: entry.source,
        source_path: entry.source_path,
        row_count: entry.row_count,
        total_ms: entry.timings.totalMs,
        process_input_ms: entry.timings.processInputMs,
        cache_entry_name_ms: entry.timings.cacheEntryNameMs,
        parser: entry.timings.parser,
        phases: entry.timings.parser?.phases,
        slow_rows: entry.timings.parser?.slowRows,
      })),
      post_process_by_type: event === "summary" ? this.postProcessEntries : undefined,
      top_phases: this.getTopGlobalPhases(10),
    };
  }

  private getTopGlobalPhases(limit: number) {
    return Object.entries(this.globalPhaseTotals)
      .map(([phase, total_ms]) => ({ phase, total_ms }))
      .sort((a, b) => b.total_ms - a.total_ms)
      .slice(0, limit);
  }

  private printSlowFlowAlert(entry: IFlowParserPerfEntry): void {
    const { flow_name, flow_type, source, source_path, row_count, timings } = entry;
    const parser = timings.parser;
    const parts = [
      `${flow_type}/${flow_name}`,
      `${formatDurationMs(timings.totalMs)}`,
      `parse ${formatDurationMs(timings.processInputMs)}`,
    ];
    const phaseSummary = formatTopPhases(parser?.phases, 6);
    if (phaseSummary) {
      parts.push(`phases: ${phaseSummary}`);
    }
    if (timings.cacheEntryNameMs >= 100) {
      parts.push(`cacheKey ${formatDurationMs(timings.cacheEntryNameMs)}`);
    }
    console.log(
      chalk.yellow(
        `[FlowParser slow] ${parts.join(" | ")} (${source}, ${row_count ?? "?"} rows${source_path ? `, ${source_path}` : ""})`
      )
    );
    if (parser?.slowRows?.length) {
      const rowParts = parser.slowRows
        .slice(0, 3)
        .map((r) => `row ${r.rowNumber}${r.type ? ` (${r.type})` : ""} ${formatDurationMs(r.ms)}`);
      console.log(chalk.yellow(`  slow rows: ${rowParts.join(", ")}`));
    }
  }

  private writeLine(data: Record<string, unknown>): void {
    appendFileSync(FLOW_PARSER_PERF_LOG, `${JSON.stringify(data)}\n`);
  }

  private printConsoleSummary(summary: ISummaryData, isFinal: boolean): void {
    const progressLabel =
      summary.queue_total && summary.queue_processed
        ? `${summary.queue_processed}/${summary.queue_total}`
        : `${summary.flow_count}`;
    const pct =
      summary.queue_total && summary.queue_processed
        ? ` (${Math.round((summary.queue_processed / summary.queue_total) * 100)}%)`
        : "";

    const lines = [
      chalk.blue(
        isFinal
          ? "FlowParserProcessor performance summary (final)"
          : `FlowParserProcessor performance summary (${progressLabel}${pct})`
      ),
      `  Elapsed: ${formatDurationMs(summary.total_duration_ms)} | ${summary.flow_count} flows timed | ${summary.flows_per_second?.toFixed(2) ?? "?"} flows/s`,
      `  Cache: ${summary.cache_hits} hits, ${summary.cache_misses} misses, ${summary.skipped_count} skipped`,
    ];

    if (summary.post_process_duration_ms > 0) {
      lines.push(`  Post-process: ${formatDurationMs(summary.post_process_duration_ms)}`);
    }

    lines.push(`  Log: ${FLOW_PARSER_PERF_LOG}`);

    const typeSummary = Object.entries(summary.by_flow_type)
      .sort(([, a], [, b]) => b.totalMs - a.totalMs)
      .slice(0, isFinal ? undefined : 5)
      .map(
        ([flowType, stats]) =>
          `    ${flowType}: ${stats.count} flows, total ${formatDurationMs(stats.totalMs)}, avg ${formatDurationMs(stats.avg_ms)}, max ${formatDurationMs(stats.maxMs)}`
      );
    if (typeSummary.length > 0) {
      lines.push("  By flow type:");
      lines.push(...typeSummary);
    }

    const slowestCount = isFinal ? 10 : 5;
    if (summary.slowest_flows.length > 0) {
      lines.push(`  Slowest flows (top ${slowestCount} so far):`);
      for (const flow of summary.slowest_flows.slice(0, slowestCount)) {
        const phaseDetail = formatTopPhases(flow.parser?.phases, 3);
        lines.push(
          `    ${flow.flow_type}/${flow.flow_name} (${flow.source}, ${flow.row_count ?? "?"} rows): ${formatDurationMs(flow.total_ms)} [parse ${formatDurationMs(flow.process_input_ms)}${phaseDetail ? `; ${phaseDetail}` : ""}]`
        );
      }
    }

    if (summary.top_phases && summary.top_phases.length > 0) {
      lines.push("  Slowest phases (cumulative across flows):");
      for (const { phase, total_ms } of summary.top_phases.slice(0, isFinal ? 10 : 6)) {
        lines.push(`    ${phase}: ${formatDurationMs(total_ms)}`);
      }
    }

    if (isFinal && isFlowParserDebugEnabled()) {
      lines.push(chalk.gray("  FLOW_PARSER_DEBUG enabled — per-flow details written to perf log"));
    } else if (isFinal) {
      lines.push(
        chalk.gray("  Set FLOW_PARSER_DEBUG=1 for per-flow timing details in the perf log")
      );
    }

    console.log(lines.join("\n"));
  }
}

export function getFlowMeta(flow: FlowTypes.FlowTypeWithData) {
  return {
    flow_name: flow.flow_name,
    flow_type: flow.flow_type,
    flow_subtype: flow.flow_subtype,
    source_path: flow._source?.path,
    source_url: flow._source?.url,
    row_count: flow.rows?.length ?? 0,
  };
}
