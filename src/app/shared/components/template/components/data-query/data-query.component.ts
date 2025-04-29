import { Component, computed, effect, ElementRef, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, filter, map, switchMap, tap } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { MangoQuery, MangoQuerySelector, MangoQuerySortPart } from "rxdb";
import { jsComparisonToMangoQuery } from "packages/shared/src/utils/rxdb.utils";
import { FlowTypes } from "packages/data-models";

// Authors may specify some additional parameters that modify how parameters are generated
type IAuthorParams = Partial<IQueryParams> & {
  /**
   * Ref if passing query from data_list instead of defining inline.
   * E.g. `@data.query_list.example_query_1`
   * Data from the ref will supercede any other parameters or values set inline
   */
  ref?: FlowTypes.Data_listRow;
};

interface IQueryParams {
  list_id: string;
  /**
   * If using multiple query conditions within value, specify whether to join
   * these conditions as "and" or "or" operations
   */
  condition_type: "and" | "or";
  /**
   * Specify columns and directions to sort by. Sort default `id`.
   * Multiple columns should be comma-separated, e.g. `sort: completed, score`
   * To sort descending include modifer, e.g. `sort: completed, score(desc)`
   */
  sort: string;
  /**
   * Specify if using raw mango query expression. Default "false".
   *
   * NOTE - raw queries should include full json structure as defined at:
   * https://github.com/cloudant/mango?tab=readme-ov-file#json-syntax-descriptions
   */
  raw: boolean;
}

/**
 *
 * TODO
 * - sort authoring (consistent/inconsistent with data-items and items?). Could include commas
 * - tests
 * - update RFC
 * - make fully headless (so parent doesn't render content)
 * - markdown component demo
 */
@Component({
  selector: "tmpl-data-query",
  template: "",
  styles: [`{:host:{display:none}}`],
})
export class TmplDataQueryComponent extends TemplateBaseComponent implements OnInit {
  // Use a combined query to ensure both params and value have been mapped as required
  private queryConfig = computed(() => {
    let value = this.value();
    let parameterList = this.parameterList() as IAuthorParams;

    // allow overwrite query from data_list lookup ref
    const { ref } = parameterList;
    if (ref) {
      value = ref.value;
      parameterList = ref.parameter_list;
    }

    // As the data_query overwrites it's own value with retrieved data ensure
    // new query is only created if still processing raw string query value
    // and not updated query data
    if (typeof value === "string") {
      const params = this.mapAuthorParams(parameterList);
      if (params) {
        return { value, params };
      }
    }
  });

  // HACK - create signal from combination of signals and observables
  // https://github.com/angular/angular/issues/53519
  public queryRows = toSignal(
    toObservable(this.queryConfig).pipe(
      filter((v) => v !== undefined),
      switchMap(({ params, value }) => this.subscribeToDynamicData(value, params)),
      distinctUntilChanged(isEqual)
    )
  );

  constructor(
    private dynamicDataService: DynamicDataService,
    private el: ElementRef
  ) {
    super();
    effect(() => {
      const queryRows = this.queryRows();
      this.handleQueryDataUpdated(queryRows);
    });
  }

  ngOnInit(): void {
    // HACK - the platform does not support logic-only components where no ui rendered
    // but dom lifecycle still available. As such manually target parent <template-component>`
    // and set display to none so that data-query elements do not apply and page margins
    const ref = this.el.nativeElement as HTMLElement;
    const parentEl = ref.parentElement;
    parentEl.style.display = "none";
  }

  private handleQueryDataUpdated(data: any) {
    const { name } = this._row;
    this.parent.handleActions(
      [{ action_id: "set_local", trigger: "changed", args: [name, data] }],
      this._row
    );
  }

  private mapAuthorParams(params: IAuthorParams = {}): IQueryParams {
    const { list_id, condition_type = "and", sort = "id", raw = false } = params;
    if (!list_id) {
      console.error(`data-query requires "list_id" in params`, { params });
      return undefined;
    }
    return { list_id, condition_type, sort, raw };
  }

  private subscribeToDynamicData(value: string, params: IQueryParams) {
    const { list_id, condition_type, sort, raw } = params;
    const queryObj: MangoQuery<any> = {
      limit: 1,
      sort: this.generateSort(sort),
    };
    if (raw) {
      queryObj.selector = JSON.parse(value);
    } else {
      const selectorCondition = condition_type === "or" ? "$or" : "$and";
      queryObj.selector = { [selectorCondition]: this.generateQuery(value) };
    }
    return this.dynamicDataService.query$("data_list", list_id, queryObj).pipe(
      tap((v) => {
        console.log("data updated", queryObj, v);
      }),
      // return first entry from array (if exists)
      map((v) => v?.[0])
    );
  }

  private generateSort(sortParam: string) {
    const sort: MangoQuerySortPart<any>[] = [];
    const sortFields = sortParam.split(" ").filter((v) => v);
    for (let field of sortFields) {
      let direction: "asc" | "desc" = "asc";
      field = field.replace("(asc)", "");
      if (field.includes("(desc)")) {
        direction = "desc";
        field = field.replace("(desc)", "");
      }
      sort.push({ [field]: direction });
    }
    return sort;
  }

  private generateQuery(value: string) {
    const segments = value
      .split(";")
      .map((v) => v.trim())
      .filter((v) => v);
    const query: MangoQuerySelector<any>[] = [];
    for (const segment of segments) {
      const parsed = jsComparisonToMangoQuery(segment);
      if (parsed) {
        query.push(parsed);
      }
    }
    return query;
  }
}
