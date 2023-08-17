# Combo Box

A combo box combines a text input field and a drop-down list of options. Combo boxes are used when users need to choose from a predefined set of choices, but they also have the flexibility to input their value if it's not in the list.
## Example

| type        | name               | value                                 |parameter_list |
| ---------   | ------------       |---------------                        |--------- |
| |answer_list_1 |name: name_1 \| text: This is text 1\|name: name_2 \| text: This is text 2\|name: name_3 \| text: This is text 3;||                                      
|combo_box    |combo_box_par_2_1   |                       |input_allowed: false; answer_list: @local.answer_list_1|
|combo_box    |combo_box_par_2_2   |                       |input_allowed: true; answer_list: @local.answer_list_1|

###Video demonstration (click image to play)
[![combo_box](images/combo_box.png)](videos/combo_box.mp4 "combo_box")

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1uIkaMlDjoDN7uTpHkSeEQ6Yp-4ehX9IrBQMrolpfjQc/edit#gid=569531329)   
[Live Preview Demo](https://idems-debug.web.app/template/comp_combo_box)

## Parameters

| Parameter             | Value                  | Description |
| ---------             | -----------            | --------- |
|answer_list            |null (default)          |No buttons presented|
|answer_list            |strings array           |List of options to appear in the drop-down|
|input_allowed          |false (default)         |User can not set a custom response|
|input_allowed          |true                    |User can set a custom response|
|input_position         |top (default)           |Position of input box is at the top of the drop-down list|
|input_position         |bottom                  |Position of input box is at the bottom of the drop-down list|
|answer_placeholder     |string                  |Any input placeholder|
|placeholder            |string                  |Any placeholder for button open pop_up window|
|text                   |string                  |Text to appear on top|
