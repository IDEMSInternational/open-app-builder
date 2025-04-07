import { Component, computed, effect } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { HttpService } from "src/app/shared/services/http/http.service";

@Component({
  selector: "tmpl-data-download",
  templateUrl: "./data-download.component.html",
  styleUrls: ["./data-download.component.scss"],
  standalone: true,
})
export class DataDownloadComponent extends TemplateBaseComponent {
  public childRows = computed(() => {
    // TODO - generate child rows when download value changes
    // TODO - is it just a lightweight wrapper around data-items?
    const inputRows = this.rows();

    return [];
  });
  private httpRow = computed(() => {
    this.httpService;
  });
  constructor(private httpService: HttpService) {
    super();

    effect(() => {
      const url = this.value();
      if (url) {
        const id = `TODO - generate`;
        this.httpService.get(url, { cacheExpiry: "30d", retry: 2, strategy: "cache-first" });
      } else {
        // remove child rows?
      }
    });
  }
}
