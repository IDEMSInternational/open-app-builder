# Template Overrides

Alternative templates can be used to override initial templates for use cases such as A/B testing or language variations.
There are various ways to override data within the app

## Case 1 - Template and data lists at runtime
Both template and data lists support providing `override_target` and `override_condition` columns on their contents sheet to determine under which conditions these flows will override.

!!! warning
Other flow types and generated flows do not currently support this feature

### Example

In the following a template named `default_template` will be overidden by a template named `override_template` whenever the app language starts with the letters `es` (e.g. es_sp, es_ca)

| flow_type |	flow_name	        |	override_target	 | override_condition |
|---------  |---------------    |----------------- |------------------- |
| template	|	default_template  |	                 |                    |
| template	|	override_template | default_template | @fields._app_language.startsWith("es") |

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1MpoH3BxhECZRmYM10HZ0pTOoe69FJ-fEW9FwzK-Q6yw/edit#gid=1745157248)   
[Live Preview Demo](https://plh-teens-app1.web.app/template/example_override_default)

### Parameters

| Parameter          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| override_target	   | Name of template to override                            |
| override_condition | Condition statement that must be satisfied for override |


### Template Self-reference
Sometimes it might be useful to reference the original template from the override sheet, such as displaying the same original template but with different variables, or with additional content above or below.

In this case an additional `is_override_target` parameter is required when referencing the default template from the override. 

*override_template*

| type              |	name	            |	value	                              | is_override_target  |
|---------          | ---------------       | -----------------                       |-------------------  |
| title	            |	title_1             | This appears above default content      |                     |
| begin_template    |	default_template    | default_template                        | ==TRUE==            |
| end_template	    |	                    |                                         |                     |

This is to prevent an infinite loop that would otherwise occur as the default_template is replaced by the override.


## Case 2 - All flow types at build time
It is also possible to replace any other flow type during sync and build by specifying additional sheets with the same flow_type and flow_name properties. In this case the last-synced (or generated) flow will take priority.

This can be useful in cases where multiple apps share some of the same core content, and want to only apply a number of replacements/additions. 

!!! example "Experimental"
See open issue [2081](https://github.com/IDEMSInternational/parenting-app-ui/issues/2081) for proposals to add multiple data sources to make this type of override system more easy to implement