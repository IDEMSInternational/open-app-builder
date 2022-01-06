import { Component, OnInit } from "@angular/core";

@Component({
  selector: "existing-comments",
  templateUrl: "./existing-comments.component.html",
  styles: [
    `
      :host {
        width: 100%;
        flex: 1;
      }
      .comments {
        flex: 1;
        border-top: var(--ion-border-thin-standard);
        width: 100%;
        padding: 10px;
      }
      h2 {
        margin-top: 0;
      }
    `,
  ],
})
export class ExistingCommentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
