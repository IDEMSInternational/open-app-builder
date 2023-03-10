# In-App Updates

When an update is available for the app, i.e. a newer version of the app is available in the App Store, it is possible to alert users from within the app and prompt them to perform the update.

The UI presented to the user is handled by Google's Play Core service, which offers two different update flows ([more details and examples here](https://developer.android.com/guide/playcore/in-app-updates)):

- "Flexible" update, which provides an optional, background update process
- "Immediate" update, which requires the user to update and restart the app to continue using it

## Enabling In-App Updates
In-app updates must be opted into for a given deployment by setting the `enabled` property to `true` on the `APP_UPDATES` constant in the app config. For more information about deployment configurations, see the [Deployments](../deployments/#customise-configuration) documentation.

Once enabled, the app will automatically check for updates on every init, e.g. on launch. The user can be prompted to perform an update, if one is available, using the template actions detailed below.

## Template Actions
The `app_update` template action can be triggered with one of the following arguments (e.g. `click | app_update: complete`) to have the corresponding effect.

| argument             | description   |
| ---------         | ------------  |
| prompt	| Check for updates. If an update is available, prompt the user to download and apply it, using Android's "Flexible" update strategy UI, which encourages the user to update but gives the option to not do so. Further details in [Android Documentation](https://developer.android.com/guide/playcore/in-app-updates#flexible)	|
| complete	    | After a flexible update has finished downloading, this action will finish applying the update, by installing it and relaunching the app. If this action is not triggered manually from a template, the update will be installed on the app's next init (e.g. relaunch) |
| force	        | Check for updates. If an update is available, force the user to download and apply it, using Android's "Immediate" update strategy UI (the prompt can in fact still be dismissed). Further details for this flow can be found in [Android Documentation](https://developer.android.com/guide/playcore/in-app-updates#immediate) |


## Flexible Updates
If using the Flexible update flow, i.e. triggering the `app_update: prompt` action, then it is recommended to include a template's name as the value for `APP_UPDATES.completeUpdateTemplate`, which will be displayed in-app when a flexible update is downloaded and ready to install. This template should include a trigger for the `app_update: complete` action. For example:

|type               |	name	        |   value   |	action_list |
| ---------         | ------------      | --------- | ------------  |
|text               |	text          |	@global.app_name has downloaded an update. Please restart the app to finish installation.  |               |
|button          |	button		| Restart | click &#124 app_update: complete |


!!! Tip
    If no template is provided, the flexible update flow can still be used, and the update will finish installing on the app's next init.

## Testing
Testing and debugging update functionality is quite a time-consuming process, as it requires building multiple versions of the app and sharing them via Google's [Internal App Sharing](https://play.google.com/console/internal-app-sharing) feature. 

#### Steps

1. Create local build
```
yarn build
```
Manually delete folders from `www\assets\app_data\assets` to reduce size for easier upload 

2. Sync to android and open in android studio
```
npx cap sync
npx cap open
```

3. Create a debug build from android studio menu (assumes google.json populated locally)
_Build -> Build Bundles / APKs -> Build Bundle_

    It should prompt a message on complete to locate the bundle, e.g. `...\parenting-app-ui\android\app\build\outputs\bundle\debug`

4. Upload to [internal app sharing](https://play.google.com/console/internal-app-sharing) (each user maintains their own list of uploaded apps, so you won't be able to see what others have uploaded)

1. Grab a physical device (uninstall production version of app if installed). Enable play store developer mode and internal app sharing setting as per [these instructions](https://support.google.com/googleplay/android-developer/answer/9844679?hl=en)

2. Download the app from the internal link created. 

3. Increase version and repeat steps 1-4
```
yarn scripts version
```

1. Follow link to new internal update but do not install (assume this makes device aware of potential update instead of waiting for store periodic check)

2.  Go back to installed app. Now that an update is "available", the actions should trigger the update as expected.