import { NgModule } from "@angular/core";

import { ObjectValuesPipe } from "./objectValues.pipe";
import { IsoDateToDateInputPipe } from "./isoDateToDateInput.pipe";
import { ObjectKeysPipe } from "./objectKeys.pipe";
import { ArraySortPipe } from "./arraySort.pipe";

const Pipes = [ObjectValuesPipe, ObjectKeysPipe, IsoDateToDateInputPipe, ArraySortPipe];

@NgModule({
  declarations: Pipes,
  imports: [],
  exports: Pipes,
})
export class SharedPipesModule {}
