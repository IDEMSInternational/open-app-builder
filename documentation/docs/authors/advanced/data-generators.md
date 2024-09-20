# Data Generators

As seen in [Looping Data](../looping-data), it is possible to use data_lists as a basis for iterative content loops within a single template.

Data generators extend this idea further, to create multiple content flows from a single input data_list. The generated outputs can be templates, other data_lists or any other flow type.

## Defining Generators
A generator minimally requires an `input_data_list` source and a `generator` flow type

*example content_list*   

| flow_type        | flow_name     | parameter_list   | 
| --------- |---------  |-------------- |
| data_list	| module_list	| 	    |
| generator	| module_home_gen	| input_data_list: module_list |

**Input Parameters**

A full list of available parameters is listed below:

| parameter           | description                                                                                          | default                   |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------- |
| input_data_list     | Source data_list to loop over for generator | (none)                    |
| output_flow_type    | Specify flow_type to save output as                                                                  | template                  |
| output_flow_subtype | Specify flow_subtype to save output as                                                               | generated                 |
| output_flow_name    | Specify flow_name to save template as. Can reference data from input data_list                       | {{flow_name}}_{{@gen.id}} |

!!! Tip
    Each row of the input data_list will be processed to generate an output flow. The `@gen` dynamic prefix can be used to refer to values from within the input list row. 

## Example
In this example we will use start with a list of modules, and use a generator to create individual templates to show content from the module

### Input

*module_list*

| id        | title     | description   | 
| --------- |---------  |-------------- |
| module_1	| Welcome	| Welcome to the course...	    | 
| module_2	| Let's get started	| In this unit we will...    |

*module_home_gen*

The generator provides a simple template to display the module title and text descriptions, and a button that will later be used for navigation

| type        | name    | value                 |
| ----------- | --------| --------------------- |
| title       |         | @gen.title            |
| text        |         | @gen.description      |
| button      |         | Continue              |


### Output
Each row of input data will be processed to produce an output template flow

*module_home_gen_module_1*

| type        | name    | value                 |
| ----------- | --------| --------------------- |
| title       |         | Welcome            |
| text        |         | Welcome to the course...  |
| button      |         | Continue  |

*module_home_gen_module_2*

| type        | name    | value                 |
| ----------- | --------| --------------------- |
| title       |         | Let's get started           |
| text        |         | In this unit we will...      |
| button      |         | Continue  | 

We could further develop this example to include images, add actions for the button click, mark content as hidden or conditional on data etc.

## Special Cases

**Generate output with dynamic references**   
If the generated output includes dynamic references that need to be preserved then it may be necessary to double-wrap the reference in the generator.

For example, a generator is used to create `data_pipe` flows for further processing data.
References to `@row` local processing must use `{{@row}}` to populate correctly.

| operation      | args_list                                      |
| -------------- | ---------------------------------------------- |
| append_columns | task_child: {@gen.id}_{{@row.id}}_article_tasks; |


## Additional Info

<!-- TODO -->
[Google Sheet Demo](#) - *Not currently available*

<!-- TODO -->
[Live Preview Demo](#) - *Not currently available*

See details in original [RFC Proposal Doc](https://docs.google.com/document/d/1cK_Mk3nTZIKxux8bygKvujUFkVENMOE_xIgM6w9PlRw/edit)





