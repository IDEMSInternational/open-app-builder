/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const care_package_list: FlowTypes.Care_package_list[] = [
  {
    "flow_type": "care_package_list",
    "flow_name": "care_package_list",
    "status": "released",
    "rows": [
      {
        "id": "care_package_self",
        "label": "Self care",
        "description": "Taking care of yourself is an important parenting skill!",
        "icon_asset": "assets/plh_assets/plh_images/care_packages/care_package_self.svg",
        "habit_list": [
          "habit_relax",
          "habit_treat_yourself",
          "habit_praise_yourself"
        ]
      },
      {
        "id": "care_package_teen",
        "label": "Teen care",
        "icon_asset": "assets/plh_assets/plh_images/care_packages/care_package_teen.svg",
        "habit_list": [
          "habit_spend_time",
          "habit_praise_teen"
        ]
      },
      {
        "id": "care_package_behaviour",
        "label": "Behaviour care",
        "habit_list": [
          "habit_consequence",
          "habit_breathe"
        ]
      },
      {
        "id": "care_package_family",
        "label": "Family care",
        "habit_list": [
          "habit_money",
          "habit_safe"
        ]
      }
    ]
  }
]