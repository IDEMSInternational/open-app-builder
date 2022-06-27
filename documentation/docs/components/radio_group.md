# Radio Group

## Example

| type       | name                      |parameter_list |
| ---------  | ------------              |--------- |
|radio_group |radio_group_par_2_1	     |answer_list: @local.answer_list_2|
|radio_group |radio_group_par_2_2	     |answer_list: @local.answer_list_3|
|radio_group |radio_group_par_2_3	     |answer_list: @local.answer_list_4|

![](images/radio_group.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1qfatsiHKJ8sCBcJ8oqo3InLrjzT_a2Qxvw6RyxVMTxY/edit#gid=569531329)   
[Live Preview Demo](https://plh-global.web.app/template/comp_radio_group)

## Parameters

| Parameter             | Value                  | Description |
| ---------             | -----------            | --------- |
|answer_list            |null (default)          |No buttons presented|
|answer_list            |strings array           |List of buttons with parameters|
|radio_button_type      |btn_text (default)      |Text only appears on the button|
|radio_button_type      |btn_square              |Button with icon and text value|
|radio_button_type      |btn_image_check         |Button image with the check functionality|
|radio_button_type      |btn_image_nocheck       |Button image without the check functionality|
|options_per_row        |2 (default)             |By default two buttons in one row|
|options_per_row        |number                  |Any number for buttons in one row|
|style	                |full (default)          |To be removed|
|style	                |standard (default)      |To be removed|
