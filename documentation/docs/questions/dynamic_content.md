# Dynamic content

**When does dynamic content get updated?**

_Asked on 25 May 2022_

Typically content that depends on dynamic variables should update automatically if it is in the same sheet (and I think also any nested child templates of the template that triggered the action), however if a child template makes changes that affect the parent content (e.g. setting a field) then an additional emit: force_reprocess or emit: force_reload action may be required. For the case of app-wide changes (e.g. language change, enabling developer mode etc.) a full emit: force_restart action is required that will restart the app.

_Answered on 25 May 2022 by CC_
