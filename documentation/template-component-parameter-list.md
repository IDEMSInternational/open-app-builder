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
- disabled - boolean. Default: false.
- style - string. Class name for button. Default: "primary". Styles: orange, light_orange, light_blue, dark_blue, active, passive, make-me-smile, get-me-going.
- text-align - string. Text align. Default 'center'.

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
- labels_count - labels count for slider. Default - 8
- no_value - boolean. Default - false. Control is no_value selected

## Timer - TmplTimerComponent

- value - timer duration in minutes. Default - 10 minutes
- title - text or null - Timer title text.
- help - text or null. If null - don't display help icon.
- is_editable_on_playing - boolean value, is it possible to change the values of the timer when it is running. Default - false
- timerDurationExtension - number. Value for increase the time on the timer. Default - 1 minute

## Radio Buttons - TmplRadioGroupComponent

- value - string or null. Result or selected by default.
- radio_button_list - string or null. List of buttons with parameters. Default - undefined. (Supports only svg images).
- radio_button_type - string or null. Type of radio buttons. Default - null
- options_per_row - number. Count of radio button in one row. Default - 2
- color - string. Border color if it is checked. Default - '#0D3F60'
- background_gradient - string. Background button color. Default - "168.87deg, #0F8AB2 28.12%, #0D4060 100%"
- radio_button_type - type of radio button (btn_triangle | btn_square | btn_image)


## ComboBox - TmplComboBoxComponent

- value - string or null. Result or selected by default.
- list_of_answers - string or null. List of the answers to be displayed. Default - null
- text - string or null. Text of question. Default - null
- input_allowed - boolean. Can the user set a custom response. Default - false
- input_position - string or null. Position of input element('top or bottom'). Default - top
- answer_placeholder - string. Input placeholder. Default - empty string

## TextBox - TmplTextBoxComponent

- value - string or null. Input value. Default - undefined
- max-length - number. Max length input value. Default - 30
- placeholder - string or null. Input placeholder. Default - empty string
- text-align - string. Default - center

## TileComponent - TmplTileComponent

- value - any. Default - undefined
- first_line_text - string or null. Text. Default - null
- second_line_text string or null. Text. Default - null
- icon_src - string or null. image file source link. Default - null.
- style - string. Name of default css class. Default 'quick_start'. Styles: 'default_style', 'quick_start', 'quick_start_passive', 'quick_start_blue', 'quick_start_red'.

## DashedBox - TmplDashedBoxComponent
- value - any. Default - undefined.
- icon_src - string. Path to image. Default empty.
- icon_position - string. Position of icon. Default - top-left.

## Title - TmplTitleComponent
- help - string or null.
- tooltipPosition - string. Defalut - 'right' 
- textAlign - string. Default - 'left'
- style - string. Setting style of the text. Default - 'primary'

## DisplayGroupComponent - TmplDisplayGroupComponent
- offset - number. Offset to move abroad component. Default - 0.
- style - string or null. Class name. Default - null.
  Names of styles - 'light_orange', 'orange', 'light_blue', 'blue', 'dark_blue', 'white_box', 'active_banner', 'passive_banner', 'display_group_bottom'.

## DashedBox - TmplDashedBoxComponent
- value - any. Default - undefined.
- icon_src - string. Path to image. Default empty.
- icon_position - string. Position of icon. Default - top-left.
## SubtitleComponent - TmplSubtitleComponent

- text-align - string. Default - left
- style - string or null. Name of default css class. (white | passive) Default - passive


