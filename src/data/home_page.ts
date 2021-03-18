/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const home_page: FlowTypes.Home_page[] = [
  {
    "flow_type": "home_page",
    "flow_name": "home_page",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "id": "workshops",
        "text": "WeeklyWorkshops",
        "visible": true,
        "enabled": true,
        "route": "/module_list",
        "left_image": "plh_images/home_page/home_page_workshops.svg"
      },
      {
        "type": "button",
        "id": "parent_points",
        "text": "ParentPoints",
        "visible": true,
        "enabled": true,
        "route": "/parent_points",
        "left_image": "plh_images/home_page/home_page_parent_points.svg"
      },
      {
        "type": "button",
        "id": "parent_center",
        "text": "ParentCentre",
        "visible": true,
        "enabled": false,
        "route": "/parent_center",
        "left_image": "plh_images/home_page/home_page_parent_center.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\ver_7_design\\navigation\\home_page.xlsx"
  }
]