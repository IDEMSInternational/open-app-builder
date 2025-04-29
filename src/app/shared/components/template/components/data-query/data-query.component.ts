import { Component, computed, effect } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { MangoQuery, MangoQuerySortPart } from "rxdb";
import { jsComparisonToMangoQuery } from "shared/src/utils/rxdb.utils";

// The only required author param is list_id
type IAuthorParams = Partial<IQueryParams> & { list_id: string };

interface IQueryParams {
  list_id: string;
  /** */
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
 *
 * TODO
 * - query selectors
 * - raw query
 * - sort authoring (consistent/inconsistent with data-items and items?)
 * - tests
 * - update RFC
 */
@Component({
  selector: "tmpl-data-query",
  template: "",
  styles: [`{:host:{display:none}}`],
})
export class TmplDataQueryComponent extends TemplateBaseComponent {
  private queryParams = computed(() => this.mapAuthorParams(this.parameterList()));

  // Use a combined query to ensure both params and value have been mapped as required
  private queryConfig = computed(() => {
    const params = this.queryParams();
    const value = this.value();
    // As the data_query overwrites it's own value with retrieved data ensure
    // new query is only created if still processing raw string query value
    // and not updated query data
    if (typeof value === "string" && params) {
      return { value, params };
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

  constructor(private dynamicDataService: DynamicDataService) {
    super();
    effect(() => {
      const queryRows = this.queryRows();
      this.handleQueryDataUpdated(queryRows);
    });
  }

  private handleQueryDataUpdated(data: any) {
    console.log("query data updated", data);
    const { name } = this._row;
    this.parent.handleActions(
      [{ action_id: "set_local", trigger: "changed", args: [name, data] }],
      this._row
    );
  }

  private mapAuthorParams(params: IAuthorParams = { list_id: "" }): IQueryParams {
    const { list_id, condition_type = "and", sort = "id", raw = false } = params;
    if (!list_id) {
      console.error(`data-query requires "list_id" in params`);
      return undefined;
    }
    return { list_id, condition_type, sort, raw };
  }

  private subscribeToDynamicData(value: string, params: IQueryParams) {
    const { list_id, condition_type, sort } = params;
    const selectorCondition = condition_type === "or" ? "$or" : "$and";
    const queryObj: MangoQuery<any> = {
      limit: 1,
      sort: this.generateSort(sort),
      selector: { [selectorCondition]: this.generateQuery(value) },
    };
    console.log("queryObj", queryObj);

    return this.dynamicDataService.query$("data_list", list_id, queryObj).pipe(
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
    const segments = value.split(";").map((v) => v.trim());
    for (const segment of segments) {
      const parsed = jsComparisonToMangoQuery(segment);
      console.log("parsed", segment, parsed);
    }
    return [];
  }
}

function extractLogicOperator(s: string) {
  if (s.includes("<=")) return "$gt";
}
