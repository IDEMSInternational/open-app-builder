# Template Components

## Audio - TmplAudioComponent

- value - link to file
- src - audio file source link if value is null try to find link in src parameter. 
- title - title. Default: "Title"
- help - help tooltip text.
- rangeBarDisabled - disable select audio seconds on range bar. Default: false
- timeToRewind - time to rewind in seconds. Default: 15 seconds

## Button - TmplButtonComponent

- value - text - button text
- width - number - button width. Default: 172
- height - number - button height. Default: 62
- color - color variable or hex. Default: primary
- disabled - boolean. Default: false

## Number Selector - TmplNumberComponent

- value - number or null. If null - don't display slider picker circle.

- help - text or null. If null - don't display help icon.
- min_value - number - minimum value of selector. Default - 0
- max_value - number - maximum value of selector. Default - 6
- title - text or null - Number Selector title text.
- height - short or normal. Control style of number selector. 
- category_list - list of text values for component. 
- first_display_term - first display term (category list index, or generated list index)
- category_size - step for generated list. Defalut - 1

If category_list available we take list of values from it.
If category_list is not available we generate list of values based on min_value, max_value, category_size

## Checkbox - TmplSimpleCheckboxComponent

- value - boolean value of checkbox. If true - checked
- position - checkbox position relative to label_text - left | right. Default - left
- label_text - text label for checkbox

## Slider - TmplSliderComponent

- value - select value on slider. Default - 0 
- help - text or null. If null - don't display help icon.
- min - minimum value on slider. Default - 0
- max - maximum value on slider. Default - 7
- title - text or null - Slider title text.
- step - step for slider. Default - 1
- min_value_label - select value on slider
- max_value_label - select value on slider
- labels_count - labels count for slader. Default - 8
- no_value - boolean. Default - false. Control is no_value selected
