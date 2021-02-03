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
        "text": "Weekly Workshops",
        "visible": true,
        "enabled": true,
        "route": "/module_list",
        "left_image": "plh_images/home_page/home_page_workshops.svg"
      },
      {
        "type": "button",
        "id": "parent_points",
        "text": "Parent Points",
        "visible": true,
        "enabled": false,
        "route": "/parent_points",
        "left_image": "plh_images/home_page/home_page_parent_points.svg"
      },
      {
        "type": "button",
        "id": "parent_center",
        "text": "Parent Centre",
        "visible": true,
        "enabled": false,
        "route": "/parent_center",
        "left_image": "plh_images/home_page/home_page_parent_center.svg"
      }
    ]
  }
]