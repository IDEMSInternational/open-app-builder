# Migrations

`_app_version` and `_app_version_code`

`_app_version_previous` and `_app_version_code_previous`


A specific data list can be enabled 
```ts
config.app_config.MIGRATION_ACTIONS={
  enabled:true,
  dataListName:'app_version_actions'
}
```

By default the migrations will be processed in order of ID, therefore it is recommended to name systematically, e.g.

| id | action_list | condition_list| comment |
|--- | --- | --- | --- |
|001  | `trigger \| set_field : my_field : value_1` |  | |
|002  | `trigger \| set_field : my_field : value_2` |  | |

Each action will run exactly once if not previously run. This includes new app users, who will run all migrations on first load.

If this behaviour is not desirable additional conditions can be used to limit migrations applied to new users, or users upgrading from a specific version number

| id | action_list | condition_list| comment |
|--- | --- | --- | --- |
|002  | `trigger \| set_field : my_field : value_3` | `+@fields._app_version_code_previous < 0.16.12` | |

| id | action_list | condition_list| comment |
|--- | --- | --- | --- |
|002  | `trigger \| set_field : my_field : value_3` | `+@fields._app_version_code_previous < 0.16.12` | |

:::tip
If using fields like `_app_version_code` and `_app_version_code_previous` you should still force interpretation as a number as their default string representation would assume `"120" > "1100"` (per-character comparison)