# User Disaggregation

In the App Users tables, several variables across the device information and contact fields columns describe the environment in which the app is being accessed. These variables help identify the type of user. The tables below provide a comprehensive overview of each variable, their possible values, and descriptions of what they represent.

## Device Info

| Variable          | Potential Values       | Description                                                                                     |
|------------------|----------------------|-------------------------------------------------------------------------------------------------|
| platform          | ios; android; web     | Indicates whether the app is being viewed as a native iOS or Android app, or in a web browser. |
| operatingSystem   | ios; android; windows; mac | The operating system of the device on which the app is being viewed.                             |
| isVirtual         | TRUE; FALSE           | TRUE if the app is accessed through an emulator or virtual device (e.g., Appetize); FALSE otherwise. |


## Contact Fields 

| Variable                          | Potential Values                                                                                           | Description                                                                                                                                            |
|----------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| _app_environment | development; production                                                                                    | Indicates the app build environment: "development" when running locally, or "production" when running as a native app or in a web preview.           |
| _app_hostname    | localhost; plh-teens-app1--pr2885-feat-plh-progress-pa-9jd4wzx2.web.app; idems-debug.web.app             | The URL hostname used when delivering the app via web. When running locally, this is "localhost". On a native device, this may be "localhost" or empty. |

## Examples

| User Description                                             | Platform | Operating System | isVirtual | Example `_app_user_id`      |
|--------------------------------------------------------------|----------|-----------------|-----------|------------------------|
| Appetize Android                                             | android  | android         | TRUE      | fd1xxxx88ace2726       |
| Appetize iOS                                                 | ios      | ios             | TRUE      | 83DC2C47-XXXX-42CF-881F |
| Google Play                                                  | android  | android         | FALSE     | 2c02xxxx1216384b       |
| Apple App Store                                              | ios      | ios             | FALSE     | 0055E7C2-XXXX-4B9E-84B7 |
| Web preview opened on Windows computer (regular screen settings)   | web      | windows         | FALSE     | 338b36xx-b598-427b-8782 |
| Web preview opened on Android phone                          | web      | android         | FALSE     | f0087cxx-2b93-43ff-86bd |
| Web preview opened on Windows computer with screen set to Android  | web      | android         | FALSE     | 4a10bcxx-5a3d-47c9-87bd |
| Web preview opened on Windows computer with screen set to Apple    | web      | ios             | FALSE     | a273b5xx-d92f-4efb-a07d |
| Web preview opened on iPhone                                  | web      | ios             | FALSE     | 136ea2xx-4f2d-430b-8b7a |
| Web preview opened on Mac computer                                   | web      | mac             | FALSE     | 05b6b3xx-af52-4af8-bed6 |
