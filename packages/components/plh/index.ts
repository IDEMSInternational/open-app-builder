import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleListItemComponent } from "./plh-kids-kw/components/module-list-item/module-list-item.component";
import { PlhCompletionModalComponent } from "./plh-kids-kw/components/completion-modal/completion-modal.component";
import { PlhModuleDetailsHeaderComponent } from "./plh-kids-kw/components/module-details-header/module-details-header.component";
import { PlhBottomNavigationBarComponent } from "./plh-kids-kw/components/bottom-navigation-bar/bottom-navigation-bar.component";

export {
  PlhParentPointCounterComponent,
  PlhParentPointBoxComponent,
  PlhModuleListItemComponent,
  PlhCompletionModalComponent,
  PlhModuleDetailsHeaderComponent,
  PlhBottomNavigationBarComponent,
};

export const PLH_COMPONENTS = [
  PlhParentPointCounterComponent,
  PlhParentPointBoxComponent,
  PlhModuleListItemComponent,
  PlhCompletionModalComponent,
  PlhModuleDetailsHeaderComponent,
  PlhBottomNavigationBarComponent,
];

export const PLH_COMPONENT_MAPPING = {
  parent_point_counter: PlhParentPointCounterComponent,
  parent_point_box: PlhParentPointBoxComponent,
  plh_module_details_header: PlhModuleDetailsHeaderComponent,
  plh_module_list_item: PlhModuleListItemComponent,
  plh_completion_modal: PlhCompletionModalComponent,
  plh_bottom_nav: PlhBottomNavigationBarComponent,
};

export type PLHComponentName = keyof typeof PLH_COMPONENT_MAPPING;
