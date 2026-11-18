import { CourseAccordionComponent } from "./course-accordion/course-accordion.component";
import { CourseSubItemComponent } from "./course-accordion/course-sub-item/course-sub-item.component";

/**
 * Components specific to PLH (Parenting for Lifelong Health) deployments.
 * Kept separate from the core components so that they can be moved out of this repo later.
 */
export const PLH_REACTIVE_COMPONENT_MAP = {
  plh_course_accordion: CourseAccordionComponent,
  plh_course_sub_item: CourseSubItemComponent,
};
