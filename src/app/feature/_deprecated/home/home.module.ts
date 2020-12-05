import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { HomeIndoorBlobsComponent } from './home-indoor-blobs/home-indoor-blobs.component';
import { HomeButtonsComponent } from './home-buttons/home-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomePage,
    HomeIndoorBlobsComponent,
    HomeButtonsComponent
  ],
})
export class HomePageModule {}
