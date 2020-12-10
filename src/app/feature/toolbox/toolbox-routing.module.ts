import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ToolboxPage } from "./components/toolbox.page";

const routes: Routes = [
  {
    path: "",
    component: ToolboxPage,
  },
  {
    path: "flow/:flow_name",
    loadChildren: () =>
      import("./components/toolbox-topic/toolbox-topic.module").then(
        (m) => m.ToolboxTopicPageModule
      ),
  },
  {
    path: "topic",
    loadChildren: () =>
      import("./components/toolbox-topic/toolbox-topic.module").then(
        (m) => m.ToolboxTopicPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolboxPageRoutingModule {}
