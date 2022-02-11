# Template Overrides

Alternative templates can be used to override initial templates for use cases such as A/B testing or language variations.

## Example

In the following a template named `default_template` will be overidden by a template named `override_template` whenever the app language starts with the letters `es` (e.g. es_sp, es_ca)

| flow_type |	flow_name	        |	override_target	 | override_condition |
|---------  |---------------    |----------------- |------------------- |
| template	|	default_template  |	                 |                    |
| template	|	override_template | default_template | @fields._app_language.startsWith("es") |

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1MpoH3BxhECZRmYM10HZ0pTOoe69FJ-fEW9FwzK-Q6yw/edit#gid=1745157248)   
[Live Preview Demo](https://plh-teens-app1.web.app/template/example_override_default)

## Parameters

| Parameter          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| override_target	   | Name of template to override                            |
| override_condition | Condition statement that must be satisfied for override |


## Self-reference
Sometimes it might be useful to reference the original template from the override sheet, such as displaying the same original template but with different variables, or with additional content above or below.

In this case an additional `is_override_target` parameter is required when referencing the default template from the override. 

*override_template*

| type             |	name	            |	value	                                  | is_override_target  |
|---------         | ---------------    | -----------------                       |-------------------      |
| title	           |	title_1           | This appears above default content      |                         |
| begin_template	 |	default_template  | default_template                        | ==TRUE==                |
| end_template	   |	                  |                                         |                         |

This is to prevent an infinite loop that would otherwise occur as the default_template is replaced by the override.