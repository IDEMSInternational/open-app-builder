import { NgModule } from "@angular/core";

import { ObjectValuesPipe } from "./objectValues.pipe";
import { IsoDateToDateInputPipe } from "./isoDateToDateInput.pipe";
import { ObjectKeysPipe } from "./objectKeys.pipe";

const Pipes = [ObjectValuesPipe, ObjectKeysPipe, IsoDateToDateInputPipe];

@NgModule({
  declarations: Pipes,
  imports: [],
  exports: Pipes,
})
export class SharedPipesModule {}
