# Round_button

## Example

| type        | name                | value                          |parameter_list |
| ---------   | ------------        | ------                         |--------- |
|round_button |round_button_par_2_1	|Icon_src parameter empty string |icon_src: |
|round_button |round_button_par_2_2	|Icon_src parameter string	     |icon_src: plh_images/icons/play.svg|

![](images/button.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1OmgZICjM5EMT1KgLOU_ovDljRF_SPlpQAgkKWPrNX0s/edit#gid=569531329)   
[Live Preview Demo](https://plh-teens-app1.web.app/template/comp_button)

## Parameters

| Parameter             | Value                  | Description |
| ---------             | -----------            | --------- |
|icon_src               |empty string (default)  |Button without an icon|
|icon_src               |string                  |Button with an icon. The `icon_src` can be a file path within the `global` subfolder of the assets folder or an icon in the [ionicons](https://ionic.io/ionicons) library|
|style                  |information (default)   |Button colour primary|
|style                  |navigation              |Button colour secondary with a smaller diameter|
|style                  |yellow                  |Button colour yellow|
|style                  |orange                  |Button colour orange|
|style                  |dark_orange             |Button colour dark orange|
|style                  |home_screen             |Button colour primary positioned to the righthand side of the screen|
|text                   |empty string - (default)|No text on the button|
|text                   |string                  |any string as a button text|
|disabled	            |false (default)         |To be removed|
|disabled	            |true                    |To be removed|
|starting_seconds       |0 - (default)           |To be removed|
|starting_seconds       |number                  |To be removed|
|ping                   |'' - (default)          |To be removed|     
|button_align           |center (default)        |To be removed|
|button_align           |left                    |To be removed|
|button_align           |right                   |To be removed|



type: round_button

Parameters
Parameter 1
Parameter Name: disabled

Values and descriptions
value_1: false (default) description: Available click event value_2: true description: Disabled click event

Parameter 2
Parameter Name: icon_src

Values and descriptions
value_1: empty string (default) description: no icon value_2: string description: path for icon

Parameter 3
Parameter Name: style

Values and descriptions
description: String. Class name for button. value_1: information - (default) description: Primary background color. (--ion-btn-primary) value_2: navigation description: Secondary background color. (--ion-btn-secondary) value_3: yellow description: yellow background (--round-icon-button-light) value_4: orange description: orange background (--round-icon-button) value_5: dark_orange description: dark_orange background (--round-icon-button-dark) value_6: home_screen description: specific styles to place the button on home screen

Parameter 4
Parameter Name: button_align

Values and descriptions
value_1: center - (default) description: Button position value_2: left description: Button position
value_3: right description: Button position

Parameter 5
Parameter Name: text

Values and descriptions
value_1: empty string - (default) description: no text for the button value_2: string description: any string as a button text

Parameter 6
Parameter Name: starting_seconds

Values and descriptions
value_1: 0 - (default) description: 0 seconds by default value_2: number description: any number as starting seconds

Parameter 7
Parameter Name: ping

Values and descriptions
value_1: '' - (default)
