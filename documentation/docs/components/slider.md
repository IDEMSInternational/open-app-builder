# Slider
## Example

| type      | name          |parameter_list                 |
| --------- | ------------  |---------                      |
|slider	    |slider_par_5_1 |min: 0; max: 10; step: 2       |
|slider     |slider_par_5_2 |min: 0; max: 10; step: 5       |

![](images/slider.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1oSJHE2gq_WqgQM6NAKWBfuxCXIjcJ1k4aIUl422QK60/edit#gid=569531329)   
[Live Preview Demo](https://plh-global.web.app/template/comp_slider)

## Parameters

| Parameter             | Value                                                        | Description                                                     |
| ---------             | -----------                                                  | ---------                                                       |                              
|help                   |string                                                        | Any text for help tooltip                                       |             
|title                  |string                                                        | Any text as a title                                             |
|min        |number                                                        | Any number as min value. Min should be less than max   |
|max       |number                                                        | Any number as max value. Min should be less than max   |
|min_value_label        |string                                                        | A string below the minimum value                                |
|max_value_label        |string                                                        | A string below the maximum value                                |
|min_max_step           |number                                                        | A number as a step size. This number needs to divide (max - min)|
|min_max_step           |number                                                        | A number as a step size. This number needs to divide (max - min)|
|min_max_labels_count   |number   | A number as the number of labels to show. This labels count minus 1 needs to divide (max - min). Selection of labels in between is possible/can be done.|
|min_max_labels_count   |number   | A number as the number of labels to show. This labels count minus 1 needs to divide (max - min). Selection of labels in between is possible/can be done.|
|no_value               |false (default)                                               | To be removed                        |
|no_value               |true                                                          | To be removed                        |
|no_value_text          |'no_value' (default)                                          | To be removed                        |
|no_value_text          |string                                                        | To be removed                        |
