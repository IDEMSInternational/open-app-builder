import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { UserDebugPage } from "./pages/user-debug/user-debug.page";

const routes: Routes = [
  {
    path: "",
    component: UserDebugPage,
  },
];

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [UserDebugPage],
})
export class UserModule {}
