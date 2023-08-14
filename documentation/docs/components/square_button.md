# Square button

A square button is an interactive element with a square appearance. It is used to trigger actions, such as navigating through different screens or menus, or initiating specific operations within the app. Square buttons can have different colours, sizes, and even icons within them to provide visual cues about their functionality.
## Example

| type         | name                  |parameter_list |
| ---------    | ------------             |--------- |
|square_button |square_button_par_3_1          |style: information|
|square_button |square_button_par_3_2         |style: navigation|

![](images/square_button.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1ptSCtSDQ-_PrgLuZiJouHa9k1nUEjg7eMzx9rVOKBUE/edit#gid=569531329)   
[Live Preview Demo](https://idems-debug.web.app/template/comp_square_button)

## Parameters

| Parameter             | Value                 | Description |
| ---------             | -----------           | --------- |
|icon_src               |empty string (default) | Button without an icon|
|icon_src               | string  | Button with an icon. The `icon_src` can be a file path within the `global` subfolder of the assets folder or an icon in the [ionicons](https://ionic.io/ionicons) library |
|style                  |information (default)  | Primary background colour|
|style                  |navigation             | Secondary background colour with twice the width|
|disabled	            |false (default)        | To be removed|
|disabled	            |true                   | To be removed|


