import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleListItemComponent } from "./plh-kids-kw/components/module-list-item/module-list-item.component";
import { PlhActivityCheckInComponent } from "./plh-kids-kw/components/activity-check-in/activity-check-in.component";
import { PlhCompletionModalComponent } from "./plh-kids-kw/components/completion-modal/completion-modal.component";
import { PlhModuleDetailsHeaderComponent } from "./plh-kids-kw/components/module-details-header/module-details-header.component";

export {
  PlhParentPointCounterComponent,
  PlhParentPointBoxComponent,
  PlhModuleListItemComponent,
  PlhActivityCheckInComponent,
  PlhCompletionModalComponent,
  PlhModuleDetailsHeaderComponent,
};

export const PLH_COMPONENTS = [
  PlhParentPointCounterComponent,
  PlhParentPointBoxComponent,
  PlhModuleListItemComponent,
  PlhActivityCheckInComponent,
  PlhCompletionModalComponent,
  PlhModuleDetailsHeaderComponent,
];

export const PLH_COMPONENT_MAPPING = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
  plh_module_details_header: PlhModuleDetailsHeaderComponent,
  plh_module_list_item: PlhModuleListItemComponent,
  plh_activity_check_in: PlhActivityCheckInComponent,
  plh_completion_modal: PlhCompletionModalComponent,
};

export type PLHComponentName = keyof typeof PLH_COMPONENT_MAPPING;
