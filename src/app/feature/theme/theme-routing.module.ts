import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThemeEditorPage } from "./pages/theme-editor/theme-editor.page";

const routes: Routes = [
  {
    path: "",
    component: ThemeEditorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
