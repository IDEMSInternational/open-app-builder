import { NgModule } from "@angular/core";

import { ObjectValuesPipe } from "./objectValues.pipe";
import { IsoDateToDateInputPipe } from "./isoDateToDateInput.pipe";

const Pipes = [ObjectValuesPipe, IsoDateToDateInputPipe];

@NgModule({
  declarations: Pipes,
  imports: [],
  exports: Pipes,
})
export class SharedPipesModule {}
