# Tasks System

A set of utilities exist to help facilitate common data interactions around a set of *tasks*

## Definition
A `task` list is an extension of a `data_list` that specifically includes a column for tracking a completion variable. By default this column should be called `completed`. 

Additionally tasks support a level of hierarchy and grouping, so that a single list of tasks is marked as `active` until all it's child tasks are complete, before proceeding to the next task list.


## Basic Example

Given a workshop with a set of modules, use tasks to track which modules have been completed and which module should be marked as currently active

### Task Lists

An initial workbook called `workshop_tasks` includes a content list of module tasks

*contents_list*

| flow_type | flow_name                   |
| --------- | --------------------------- |
| data_list | module_1_tasks              |
| data_list | module_2_tasks              |
| data_list | module_3_tasks              |

Within the module tasks data is stored, including a column for tracking task completion.

*module_1_tasks*

| id       | text                    |  completed |
| ---     | -----------------------  | ---------- |
| task_1a | Example task text 1      |  FALSE     |
| task_1b | Example task text 2      |  FALSE     |

!!! Note
    The name of the data_list that defines the initial list of tasks must be recorded within the `AppConfig`. The default value is `workshop_tasks` 


### Templating
With the list of tasks in place, we use the templating system to interact with the completion state. This is managed in the same way as `data_items` loops **(TODO - docs required)**


| id       | text                    |  completed |
| ---     | -----------------------  | ---------- |
| task_1a | Example task text 1      |  FALSE     |


See the full list of components available for use with tasks below

| type      | value         |  action_list                          |
| ------    | --------      |     --------------------------------- |
| begin_items|  @data.module_1_tasks  |                             |
| button    |  Toggle Task Complete   | click \| set_item \| completed : !@item.completed |
| end_items |  @data.module_1_tasks   |                             |


**(TODO)** - how to mark a task as completed from outside the list? (not currently possible)

### Active Task Group
**(TODO)** - Using field variables and pre-built components


## Use Cases
(TODO)




## Task Priority
(TODO) - is it possible?


## Actions

**Re-evaluate list**   
When tasks are marked as complete the full list is not automatically re-evaluated.
Instead a manual `task: evaluate` must be triggered to update relevant fields

*Example*


| type   |  action_list                                                    |
| ------ |  -------------------------------------------------------------- |
| button |  click \| task: evaluate \| data_list_name: example_task_list   |

This will evaluate all tasks within the data_list. It is also possible to pass a `row_id` parameter to limit evaluation just to a specific entry, e.g.

| type   |  action_list                                                    |
| ------ |  -------------------------------------------------------------- |
| button |  click \| task: evaluate \| data_list_name: example_task_list; row_id: task_1   |


## Parent-Child Tasks
It is also possible to create a task relationship, so that a given parent task is only marked as completed when all of the child tasks are marked as completed.

*parent_task_list*

| id  |  task_child                 | completed |
| --- |  ------------------         | --------- |
| parent_task_1 |  child_tasks_1    | FALSE     |
| parent_task_2 |  child_tasks_2    | FALSE     |

*child_tasks_1*

| id  | completed |
| --- | --------- |
| child_task_1a |  FALSE     |
| child_task_1b |  FALSE     |
| child_task_1c |  FALSE     |


**NOTE** (to format)
If evaluating the task list make sure you include 2 actions to evaluate both child and parent actions in order

| type   |  action_list                                                    |
| ------ |  -------------------------------------------------------------- |
| button |  click \| task: evaluate \| data_list_name: child_task_list <br> click \| task: evaluate \| data_list_name: parent_task_list |


## Components


