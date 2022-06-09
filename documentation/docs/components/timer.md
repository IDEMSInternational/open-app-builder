# Timer
## Example

| type      | name          |parameter_list                 |
| --------- | ------------  |---------                      |
|timer	    |slider_par_5_1 |min: 0; max: 10; step: 2       |
|timer      |slider_par_5_2 |min: 0; max: 10; step: 5       |

![](images/slider.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1oSJHE2gq_WqgQM6NAKWBfuxCXIjcJ1k4aIUl422QK60/edit#gid=569531329)   
[Live Preview Demo](https://plh-global.web.app/template/comp_slider)

## Parameters

| Parameter             | Value           | Description                 |
| ---------             | -----------     |  ---------                  |                            
|title                  |null (default)   | No title                    |
|title                  |string           | Any text as a title         |                  
|help                   |null (default)   | No help tooltip             |
|help                   |string           | Any text for help tooltip   |                  
|is_editable_on_playing |false (default)  | Not possible to change the values of the timer when it is running|
|is_editable_on_playing |true             | Possible to change the values of the timer when it is running| 
|duration_extension     |1 (default)      | Value for increase the time on the timer|                        
|duration_extension     |number           | Any number as value for increase the time on the timer|
|starting_minutes       |10 (default)     | 10 minutes by default   | 
|starting_minutes       |number           | Any number as starting minutes|
|starting_seconds       |0 (default)      | 0 seconds by default                    |
|starting_seconds       |number           | Any number as starting seconds          | 
