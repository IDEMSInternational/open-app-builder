# Template Components

## Button - TmplButtonComponent 
### Type 
type: button 
### Value
value: text - button text
### Parameters 
#### Parameter 1 
Parameter Name: disabled
##### Values and descriptions
value_1: false (default) 
description: Available click event
value_2: true 
description: Disabled click event
#### Parameter 2 
Parameter Name: style 
##### Values and descriptions
description: String. Class name for button. 
value_1: information - (default) 
description: Primary background color. (--ion-btn-primary)
value_2: full - (default) 
description: Full width
value_3: standard - (default) 
description: Text color white (--ion-color-primary-contrast) 
value_4: medium - (default) 
description: Medium height (--buttons-medium-height)
value_5: short
description: Short height (--buttons-short-height)
value_6: tall
description: Tall height (--buttons-tall-height)
value_7: medium_round
description: Medium border radius (--ion-border-radius-secondary)
value_8: no_shadow
description: No box shadow
value_9: flexible
description: Button width equal to its content width
value_10: alternative
description: Text color primary  (--ion-color-primary)
#### Parameter 3 
Parameter Name: text_align 
##### Values and descriptions 
value_1: left - (default) 
description: Text position inside
value_2: center 
description: Text position inside 
value_3: right 
description: Text position inside
#### Parameter 4 
Parameter Name: button_align 
##### Values and descriptions 
value_1: center - (default) 
description: Button position
value_2: left 
description: Button position   
value_3: right 
description: Button position   

## SquareButton - SquareIconButtonComponent 
### Type 
type: square_button 
### Parameters 
#### Parameter 1 
Parameter Name: disabled
##### Values and descriptions
value_1: false (default) 
description: Available click event
value_2: true 
description: Disabled click event
#### Parameter 2
Parameter Name: icon_src
##### Values and descriptions
value_1: empty string (default) 
description: no icon
value_2: string 
description: path for icon
#### Parameter 3 
Parameter Name: style 
##### Values and descriptions
description: String. Class name for button. 
value_1: information - (default) 
description: Primary background color. (--ion-btn-primary)
value_2: navigation 
description: Secondary background color. (--ion-btn-secondary)
## RoundIconButton - RoundIconButtonComponent 
### Type 
type: round_button 
### Parameters 
#### Parameter 1 
Parameter Name: disabled
##### Values and descriptions
value_1: false (default) 
description: Available click event
value_2: true 
description: Disabled click event
#### Parameter 2
Parameter Name: icon_src
##### Values and descriptions
value_1: empty string (default) 
description: no icon
value_2: string 
description: path for icon
#### Parameter 3 
Parameter Name: style 
##### Values and descriptions
description: String. Class name for button. 
value_1: information - (default) 
description: Primary background color. (--ion-btn-primary)
value_2: navigation 
description: Secondary background color. (--ion-btn-secondary)
value_3: yellow 
description: yellow background (--round-icon-button-light)
value_4: orange 
description: orange background (--round-icon-button)
value_5: dark_orange 
description: dark_orange background (--round-icon-button-dark)
value_6: home_screen 
description: specific styles to place the button on home screen 
#### Parameter 4 
Parameter Name: button_align 
##### Values and descriptions 
value_1: center - (default) 
description: Button position
value_2: left 
description: Button position   
value_3: right 
description: Button position 
#### Parameter 5 
Parameter Name: text 
##### Values and descriptions 
value_1: empty string - (default) 
description: no text for the button
value_2: string 
description: any string as a button text
#### Parameter 6
Parameter Name: starting_seconds
##### Values and descriptions
value_1: 0 - (default) 
description: 0 seconds by default
value_2: number
description: any number as starting seconds
#### Parameter 7
Parameter Name: ping
##### Values and descriptions
value_1: '' - (default) 

## Number Selector - TmplNumberComponent 
### Type 
type: number_selector 
### Value
value: number or null. If null - don't display slider picker circle.
### Parameters 
#### Parameter 1 
Parameter Name: min_value
##### Values and descriptions
value_1: 0 - (default) 
description: min value of selector
value_2: number 
description: Any number as a min value of selector
#### Parameter 2 
Parameter Name: max_value 
##### Values and descriptions 
value_1: 6 - (default) 
description: Max value of selector
value_2: number 
description: Any number as a max value of selector 
#### Parameter 3 
Parameter Name: title 
##### Values and descriptions 
value_1: null - (default) 
description: No title for Number Selector
value_2: string 
description: Any string as a title for Number Selector
#### Parameter 4 
Parameter Name: height 
##### Values and descriptions 
value_1: short - (default) 
description: Short height
value_2: normal 
description: Normal height
#### Parameter 5 
Parameter Name: category_list 
##### Values and descriptions
value_1: null - (default) 
description: no list
value_2: strings array 
description: list of text values for component
#### Parameter 6 
Parameter Name: first_display_term 
description: category list index, or generated list index
##### Values and descriptions
value_1: 1 - (default) 
description: first display term
value_2: number 
description: category list index
#### Parameter 7 
Parameter Name: category_size 
##### Values and descriptions
value_1: 1 - (default) 
description: step for generated list
value_2: number 
description: step for generated list
If category_list available we take list of values from it.
If category_list is not available we generate list of values based on min_value, max_value, category_size

## Checkbox - TmplSimpleCheckboxComponent 
### Type 
type: simple_checkbox 
### Value
value: boolean value of checkbox. If true - checked
### Parameters 
#### Parameter 1 
Parameter Name: align
##### Values and descriptions
value_1: center - (default) 
value_2: left
value_3: right
description: checkbox position
#### Parameter 2 
Parameter Name: label_text
##### Values and descriptions
value_1: null - (default) 
description: no label for checkbox
value_2: string
description: label text
#### Parameter 3 
Parameter Name: style
##### Values and descriptions
description: string - class name.
value_1: '' - (default) 
#### Parameter 4
Parameter Name: reverse
##### Values and descriptions
value_1: false - (default) 
description: default position - (checkbox label).
value_1: true
description: reversed - (label checkbox).

## Slider - TmplSliderComponent 
### Type 
type: slider 
### Value
value: select value on slide
### Parameters 
#### Parameter 1 
Parameter Name: help
##### Values and descriptions
value_1: null - (default) 
description: no help tooltip
value_2: string
description: any text for help tooltip
#### Parameter 2 
Parameter Name: min
##### Values and descriptions
value_1: 0 - (default) 
description: minimum value on slider
value_2: number
description: any number as min value
#### Parameter 3 
Parameter Name: max
##### Values and descriptions
value_1: 7 - (default) 
description: maximum value on slider
value_2: number
description: any number as max value
#### Parameter 4
Parameter Name: title
##### Values and descriptions
value_1: null - (default) 
description: no title
value_2: string
description: any text as a title
#### Parameter 5
Parameter Name: step
##### Values and descriptions
value_1: 1 - (default) 
description: step for slider
value_2: number
description: any number as a step for slider
#### Parameter 6
Parameter Name: min_value_label
##### Values and descriptions
value_1: null - (default) 
description: no select value on slider
value_2: string
description: select value on slider  
#### Parameter 7
Parameter Name: max_value_label
##### Values and descriptions
value_1: null - (default) 
description: no select value on slider
value_2: string
description: select value on slider 
#### Parameter 8
Parameter Name: labels_count
##### Values and descriptions
value_1: 8 - (default) 
description: labels count for slider
value_2: number
description: any number as labels count for slider 
#### Parameter 9
Parameter Name: no_value
##### Values and descriptions
value_1: false - (default) 
description: Control is no_value selected
value_2: true
description: Control is value selected
#### Parameter 10
Parameter Name: no_value_text
##### Values and descriptions
value_1: 'no_value' - (default) 
description: Control is no_value selected
value_2: string
description: any text for control is no_value selected

## Timer - TmplTimerComponent 
### Type 
type: timer 
### Value
value: number - timer duration in minutes
### Parameters 
#### Parameter 1 
Parameter Name: title
##### Values and descriptions
value_1: null - (default) 
description: no title
value_2: string
description: any text as a title
#### Parameter 2
Parameter Name: help
##### Values and descriptions
value_1: null - (default) 
description: no help tooltip
value_2: string
description: any text for help tooltip
#### Parameter 3
Parameter Name: is_editable_on_playing
##### Values and descriptions
value_1: false - (default) 
description: Not possible to change the values of the timer when it is running
value_2: true
description: Possible to change the values of the timer when it is running
#### Parameter 4
Parameter Name: duration_extension
##### Values and descriptions
value_1: 1 - (default) 
description: Value for increase the time on the timer
value_2: number
description: any number as value for increase the time on the timer
#### Parameter 5
Parameter Name: starting_minutes
##### Values and descriptions
value_1: 10 - (default) 
description: 10 minutes by default
value_2: number
description: any number as starting minutes
#### Parameter 6
Parameter Name: starting_seconds
##### Values and descriptions
value_1: 0 - (default) 
description: 0 seconds by default
value_2: number
description: any number as starting seconds

## Radio Buttons - TmplRadioGroupComponent 
### Type 
type: radio_group 
### Value
value: string or null. Result or selected by default
### Parameters 
#### Parameter 1 
Parameter Name: answer_list
##### Values and descriptions
value_1: null - (default) 
description: No buttons presented  
value_2: strings array
description: List of buttons with parameters
#### Parameter 2
Parameter Name: radio_button_type
##### Values and descriptions
value_1: btn_text - (default) 
description: text button by default
value_2: btn_square
description: button with icon and text
value_2: btn_image
description: button image only
#### Parameter 3
Parameter Name: options_per_row
##### Values and descriptions
description: Count of radio button in one row
value_1: 2 - (default) 
description: by default two buttons in one row
value_2: number
description: any number for buttons in one row
#### Parameter 4
Parameter Name: style
##### Values and descriptions
description: String. Class name for button. 
value_1: '' - (default) 
description: Primary background color for label  (--ion-color-primary-contrast)
value_2: full - (default) 
description: Full width
value_3: standard - (default) 
description: Text color white (--ion-color-primary-contrast) 
value_4: '' - (default)
description: active radio button background color  (--ion-color-primary-contrast)

## ComboBox - TmplComboBoxComponent 
### Type 
type: combo_box 
### Value
value: string or null. Result or selected by default
### Parameters 
#### Parameter 1 
Parameter Name: answer_list
##### Values and descriptions
value_1: null - (default) 
description: No answers to be displayed 
value_2: strings array
description: List of the answers to be displayed
#### Parameter 2
Parameter Name: input_allowed
##### Values and descriptions
value_1: false - (default) 
description: user can not set a custom response
value_2: true
description: user can set a custom response
#### Parameter 3
Parameter Name: input_position
##### Values and descriptions
value_1: top - (default) 
description: Position of input element
value_2: bottom
description: Position of input element
#### Parameter 4
Parameter Name: answer_placeholder
##### Values and descriptions
value_1: empty string - (default) 
description: No input placeholder
value_2: string
description: Any input placeholder
#### Parameter 5
Parameter Name: placeholder
##### Values and descriptions
value_1: null - (default) 
description: No placeholder for button open pop_up window
value_2: string
description: Any placeholder for button open pop_up window

## TextBox - TmplTextBoxComponent 
### Type 
type: text_box 
### Value
value: string or null. Input value
### Parameters 
#### Parameter 1
Parameter Name: max_length
##### Values and descriptions
value_1: 30 - (default) 
description: Max length input value 
value_2: number
description: Any number as a max length input value
#### Parameter 2
Parameter Name: placeholder
##### Values and descriptions
value_1: empty string - (default) 
description: No placeholder 
value_2: string
description: Any string input placeholder
#### Parameter 3
Parameter Name: text_align
##### Values and descriptions
description: Input position
value_1: center - (default) 
value_2: left
value_2: right
#### Parameter 4
Parameter Name: number_input
##### Values and descriptions
value_1: false - (default)
description: default text type input
value_2: true
description: number type input (allows only number)
#### Parameter 5
Parameter Name: prioritise_placeholder
##### Values and descriptions
value_1: false - (default)
description: placeholder is not prioritised
value_2: true
description: placeholder is prioritised

## TileComponent - TmplTileComponent 
### Type 
type: tile_component 
### Value
value: any. Default - undefined
### Parameters 
#### Parameter 1 
Parameter Name: first_line_tex
##### Values and descriptions
value_1: null - (default) 
description: No text for first line 
value_2: string
description: Any string as a text for first line
#### Parameter 2
Parameter Name: second_line_text
##### Values and descriptions
value_1: null - (default) 
description: No text for second line 
value_2: string
description: Any string as a text for second line
#### Parameter 3
Parameter Name: icon_src
##### Values and descriptions
value_1: null - (default) 
description: No image 
value_2: string
description: image file source link
#### Parameter 4
Parameter Name: left_icon_src
##### Values and descriptions
value_1: null - (default) 
description: No image 
value_2: string
description: image file source link
#### Parameter 5
Parameter Name: style
##### Values and descriptions
description: Name of css class 
value_1: quick_start - (default) 
description: light gradient color (--tile-secondary-light-gradient) 
value_2: quick_start_passive 
description: primary gradient color (--tile-primary-gradient)
value_3: quick_start_blue 
description: primary light gradient color (--tile-primary-light-gradient)
value_4: quick_start_dark 
description: secondary gradient color (--tile-secondary-gradient)
value_5: workshop_page 
description: tile workshop
value_6: parent_point 
description: tile parent point
value_7: image_text 
description: tile image text
value_8: button 
description: tile button

## DashedBox - TmplDashedBoxComponent 
### Type 
type: dashed_box 
### Value
value: any. Default - undefined
### Parameters 
#### Parameter 1 
Parameter Name: icon_src
##### Values and descriptions
value_1: empty string - (default) 
description: No icon 
value_2: strings 
description: Path to image
#### Parameter 2
Parameter Name: icon_position
##### Values and descriptions
description: Position of icon
value_1: top-left - (default) 
value_2: top-right 
value_3: bottom-left
value_4: bottom-right
#### Parameter 3
Parameter Name: style
##### Values and descriptions
description: Name of class
value_1: default - (default) 
description: Primary text and border color
value_2: alert 
description: Text color white and secondary border color

## Title - TmplTitleComponent 
### Type 
type: title 
### Value
value: Text of title
### Parameters 
#### Parameter 1 
Parameter Name: help
##### Values and descriptions
value_1: null - (default) 
description: No help tooltip
value_2: strings 
description: Any string for help tooltip
#### Parameter 2
Parameter Name: tooltip_position
##### Values and descriptions
description: Position of a tooltip
value_1: right - (default) 
value_2: left 
#### Parameter 3
Parameter Name: text_align
##### Values and descriptions
value_1: left - (default)
description: text left aligned 
value_2: center 
description: text center aligned
value_3: right 
description: text right aligned
#### Parameter 4
Parameter Name: style
##### Values and descriptions
value_1: tiny - (default) 
description: Tiny font size (--font-size-title-tiny)
value_2: standard 
description: Primary color (--ion-color-primary)
value_3: center
description: Position center
value_4: left - (default)
description: Position left
value_5: right 
description: Position right
value_6: alternative 
description: White text color
value_7: contextual 
description: Italic font style
value_7: emphasised 
description: Bold font style

## SubtitleComponent - TmplSubtitleComponent 
### Type 
type: subtitle 
### Value
value: Text of title
### Parameters 
#### Parameter 1
Parameter Name: style
##### Values and descriptions
value_1: standard - (default)
description: Primary color (--ion-color-primary)
value_2: medium - (default)
description: Medium font size (--font-size-subtitle-medium)
value_3: small 
description: Small font size (--font-size-subtitle-small)
value_4: large 
description: Large font size (--font-size-subtitle-large)
value_5: center
description: Position center
value_6: left
description: Position left
value_7: right 
description: Position right
value_8: alternative 
description: White text color
value_9: contextual 
description: Italic font style
value_10: emphasised 
description: Bold font style

## TextComponent - TmplTextComponent 
### Type 
type: text 
### Value
value: string. Text. Default null.
### Parameters 
#### Parameter 1
Parameter Name: style
##### Values and descriptions
value_1: standard - (default)
description: Primary color (--ion-color-primary)
value_2: medium
description: Medium font size (--font-size-text-medium)
value_3: large - (default)
description: large font size (--font-size-text-small)
value_4: small 
description: small font size (--font-size-text-large)
value_5: center
description: Position center
value_6: left
description: Position left
value_7: right 
description: Position right
value_8: alternative 
description: White text color
value_9: contextual 
description: Italic font style
value_10: emphasised 
description: Bold font style
#### Parameter 2
Parameter Name: text_align
##### Values and descriptions
description: text align inside box
value_1: left - (default)
value_2: right
value_3: center

## DisplayGroupComponent - TmplDisplayGroupComponent 
### Type 
type: display_group 
### Parameters 
#### Parameter 1 
Parameter Name: offset
##### Values and descriptions
description: Offset to move abroad component
value_1: 0 - (default) 
description: No offset
value_2: number 
description: Any number for offset
#### Parameter 2
Parameter Name: style
##### Values and descriptions
description: Class name
value_1: null - (default) 
description: default display group
value_2: tool_1 
description: essential tool style with (--tool-one-bg)
value_3: tool_2 
description: essential tool style with (--tool-two-bg)
value_4: tool_3 
description: essential tool style with (--tool-three-bg)
value_5: tool_4 
description: essential tool style with (--tool-four-bg)
value_6: tool_5 
description: essential tool style with (--tool-five-bg)
value_7: white_box 
description: essential tool style with white bg (--ion-color-primary-contrast)
value_8: active_banner 
description: banner style with secondary bg (--ion-banner-secondary)
value_9: passive_banner 
description: banner style with primary bg (--ion-banner-primary)
value_10: navigation 
description: used for buttons in order to get them beneath content
value_11: banner 
description: banner style with primary bg (--ion-dg-bg-default)
value_11: column 
description: column style
value_12: two_column 
description: two column style
value_13: two_column_images
description: two column for images (splash screen)
##### To display the element display_group with style === navigation correctly, the element must be the last one in the spreadsheets
##### If style === 'banner' and action_id === 'set_theme: active | passive' it's will be changed main background color and display_group background color.

## PointBoxComponent - TmplPointBoxComponent 
### Type 
type: parent_point_box 
### Value
value: number. Counter number
### Parameters 
#### Parameter 1 
Parameter Name: icon_src
##### Values and descriptions
value_1: null - (default) 
description: no icon
value_2: string 
description: Path to icon
#### Parameter 2
Parameter Name: lottie_src
##### Values and descriptions
value_1: null - (default) 
description: no lottie animation
value_2: string 
description: Path to lottie animation
#### Parameter 3
Parameter Name: text
##### Values and descriptions
value_1: null - (default) 
description: no text
value_2: string 
description: Any string as a text
#### Parameter 4
Parameter Name: play_celebration
##### Values and descriptions
value_1: true - (default) 
description: show falling stars when item is clicked
value_2: false 
description: disable falling stars

## ImageComponent - TmplImageComponent 
### Type 
type: image 
### Value
value: string. Path to image. Default null
### Parameters 
#### Parameter 1 
Parameter Name: style
##### Values and descriptions
description: Class name
value_1: null - (default) 
value_2: rounded_corners 
description: rounded image corners

## ParentPointCounterComponent - TmplParentPointCounterComponent 
### Type 
type: parent_point_counter 
### Value
value: string. Counter text
### Parameters 
#### Parameter 1 
Parameter Name: icon_src
##### Values and descriptions
value_1: null - (default) 
description: No icon
value_2: string 
description: Path to icon
#### Parameter 1 
Parameter Name: count
##### Values and descriptions
value_1: null - (default) 
description: No completed Parent Points
value_2: number 
description: number of completed Parent Points

## TextAreaComponent - TmplTextAreaComponent 
### Type 
type: text_area 
### Parameters 
#### Parameter 1 
Parameter Name: placeholder
##### Values and descriptions
value_1: null - (default) 
description: No placeholder
value_2: string 
description: Any string as a placeholder

## ToggleBarComponent - TmplToggleBarComponent 
### Type 
type: toggle-bar 
### Parameters 
#### Parameter 1 
Parameter Name: false_text
##### Values and descriptions
value_1: empty string - (default) 
description: No text for false value
value_2: string 
description: Any string for false value
#### Parameter 2
Parameter Name: true_text
##### Values and descriptions
value_1: empty string - (default) 
description: No text for true value
value_2: string 
description: Any string for true value
#### Parameter 3
Parameter Name: position
##### Values and descriptions
description: Position of the toggle-bar
value_1: left - (default) 
value_2: right
value_3: center 
#### Parameter 4
Parameter Name: show_tick_and_cross
##### Values and descriptions
value_1: true - (default) 
description: icon tick and cross presented no icons
value_2: false
description: no icons

## FormComponent 
### Type 
type: form 
### Parameters 
#### Parameter 1 
Parameter Name: button_text
##### Values and descriptions
value_1: Submit - (default) 
description: default text for form button
value_2: string 
description: Any string name for form button
#### Parameter 2
Parameter Name: button_pop_up
##### Values and descriptions
value_1: null - (default) 
description: No pop_up action
value_2: template name 
description: pop_up with value_2 inside after click form button
#### Parameter 3
Parameter Name: button_go_to
##### Values and descriptions
value_1: null - (default) 
description: No go_to action
value_2: template name 
description: go_to value_2 after click form button
#### Parameter 4
Parameter Name: get_device_info
##### Values and descriptions
value_1: false - (default) 
description: Submit without device info
value_2: true 
description: Submit with device info

## AdvancedDashedBoxComponent - TmplAdvancedDashedBoxComponent
### Type 
type: advanced_dashed_box 
### Parameters 
#### Parameter 1 
Parameter Name: icon_src
##### Values and descriptions
value_1: empty string - (default) 
description: No icon 
value_2: strings 
description: Path to image
#### Parameter 2
Parameter Name: icon_position
##### Values and descriptions
description: Position of icon
value_1: top-left - (default) 
value_2: top-right 
value_3: bottom-left
value_4: bottom-right
#### Parameter 3
Parameter Name: style
##### Values and descriptions
description: Name of class
value_1: default - (default) 
description: Primary text and border color
value_2: alert 
description: Text color white and secondary border color

## HelpIconComponent - TmplHelpIconComponent
### Type 
type: help_icon 
### Parameters 
#### Parameter 1 
Parameter Name: icon_src
##### Values and descriptions
value_1: help-circle-outline - (default) 
description: No icon 
value_2: strings 
description: Path to icon


### Padding and Margins control:
- no_margin_t - remove top margin;
- no_margin_lr - remove left and right margin;
- no_margin - remove all margins;
- no_padding_t - remove top padding;
- no_padding_lr - remove left and right padding
- no_padding - remove all paddings
