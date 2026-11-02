# YouTube

Plays a YouTube video inside the app. The video is streamed, so the device needs an internet connection.

## Example

| type    | name       | value                                         | parameter_list         |
| ------- | ---------- | --------------------------------------------- | ---------------------- |
| youtube | youtube_1  | https://www.youtube.com/watch?v=YE7VzlLtp-4   |                        |
| youtube | youtube_2  | `https://www.youtube.com/watch?v=<id>`        | orientation: portrait; |

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1bQ2I077nSRFpe5aLszbPzhwNysZrAbS7EeEPlwCQ7AA)   
[Live Preview Demo](https://idems-debug.web.app/template/comp_youtube)

## Value

The video link, in the format `https://www.youtube.com/watch?v=<id>`. Short links (`youtu.be/<id>`) and
Shorts links (`youtube.com/shorts/<id>`) are not supported.

Other [YouTube player parameters](https://developers.google.com/youtube/player_parameters) can be added to
the link and are passed to the player, e.g. `&start=60&end=65` plays only that part of the video.

## Parameters

| Parameter        | Default   | Description |
| ---------        | --------- | --------- |
| allow_fullscreen | true      | Show the player's fullscreen button |
| orientation      | landscape | Shape of the player. `landscape` is 16:9. `portrait` is 9:16, for vertical videos: the player is centred and takes up at most about 70% of the screen height |

The `orientation` parameter only changes the shape of the player. It is not the same as the `orientation`
parameter on a template's row in the `contents` sheet, which locks the screen orientation.
