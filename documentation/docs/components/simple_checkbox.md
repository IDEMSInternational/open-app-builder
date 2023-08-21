# Checkbox

A checkbox allows users to make a choice between two distinct options or states. It consists of a small square that can be either checked (selected) or unchecked (deselected) by the user. The square contains a checkmark when selected and is empty when not selected.

## Example

| type            | name                    |parameter_list |
| ---------       | ------------            | ------        |                
|simple_checkbox  |simple_checkbox_par_3_1	|reverse: false; label_text: label text  |
|simple_checkbox  |simple_checkbox_par_3_2	|reverse: true; label_text: label text   |

![](images/simple_checkbox.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/19t6lEBkVF0LV2dMD1yL6nbuUIFiiYNa0xLA1QQAyyxU/edit#gid=569531329)   
[Live Preview Demo](https://idems-debug.web.app/template/comp_checkbox)

## Parameters

| Parameter             | Value                | Description |
| ---------             | -----------          | --------- |
|label_text             |null (default)        | No label text for simple checkbox|
|label_text             |string                | Label text for simple checkbox|
|align	                |center (default)      | The alignment of the simple checkbox on the screen is centred|
|align	                |left                  | The alignment of the simple checkbox on the screen is left|
|align                  |right                 | The alignment of the simple checkbox on the screen is right|
|reverse                |false (default)       | The 'label text' string' is positioned to the right of the checkbox|
|reverse                |true                  | The 'label text' string' is positioned to the left of the    checkbox|
