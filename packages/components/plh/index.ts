import { PlhParentPointCounterComponent } from "./parent-point-counter/parent-point-counter.component";
import { PlhParentPointBoxComponent } from "./parent-point-box/parent-point-box.component";
import { PlhModuleListItemComponent } from "./module-list-item/module-list-item.component";
import { PlhActivityCheckInComponent } from "./plh-kids-kw/components/activity-check-in/activity-check-in.component";
import { PlhCompletionModalComponent } from "./plh-kids-kw/components/completion-modal/completion-modal.component";
import { PlhModuleDetailsHeaderComponent } from "./plh-kids-kw/components/module-details-header/module-details-header.component";
import { PlhBottomNavigationBarComponent } from "./plh-kids-kw/components/bottom-navigation-bar/bottom-navigation-bar.component";
import { PlhProgressPathComponent } from "./progress-path/progress-path.component";
import { PlhLessonCtaComponent } from "./lesson-cta/lesson-cta.component";
import { PlhParentGroupModule } from "./parent-group/plh-parent-group.module";

export {
  PlhActivityCheckInComponent,
  PlhBottomNavigationBarComponent,
  PlhCompletionModalComponent,
  PlhLessonCtaComponent,
  PlhModuleDetailsHeaderComponent,
  PlhModuleListItemComponent,
  PlhParentGroupModule,
  PlhParentPointBoxComponent,
  PlhParentPointCounterComponent,
  PlhProgressPathComponent,
};

export const PLH_FEATURE_MODULES = [PlhParentGroupModule];

export const PLH_COMPONENTS = [
  PlhActivityCheckInComponent,
  PlhBottomNavigationBarComponent,
  PlhCompletionModalComponent,
  PlhLessonCtaComponent,
  PlhModuleDetailsHeaderComponent,
  PlhModuleListItemComponent,
  PlhParentPointBoxComponent,
  PlhParentPointCounterComponent,
  PlhProgressPathComponent,
];

export const PLH_COMPONENT_MAPPING = {
  parent_point_box: PlhParentPointBoxComponent,
  parent_point_counter: PlhParentPointCounterComponent,
  plh_activity_check_in: PlhActivityCheckInComponent,
  plh_bottom_nav: PlhBottomNavigationBarComponent,
  plh_completion_modal: PlhCompletionModalComponent,
  plh_lesson_cta: PlhLessonCtaComponent,
  plh_module_details_header: PlhModuleDetailsHeaderComponent,
  plh_module_list_item: PlhModuleListItemComponent,
  plh_progress_path: PlhProgressPathComponent,
};

export type PLHComponentName = keyof typeof PLH_COMPONENT_MAPPING;
