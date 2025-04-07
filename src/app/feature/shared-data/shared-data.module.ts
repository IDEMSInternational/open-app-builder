import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/shared-data-debug/shared-data-debug.page").then((m) => m.SharedDataDebugPage),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  providers: [],
})
export class SharedDataModule {}
