# Audio

This component enables one to play audio files such as music or recorded audio within the app. It provides a means to play and pause, check audio progress and control playback.

## Example

| type      | name          | value          |parameter_list |
| --------- | ------------  | ------         |--------- |
|audio	    | audio_1	      | test_audio.mp3 |title: "Audio player #1" |

![](images/audio.png)

[Google Sheet Demo](https://docs.google.com/spreadsheets/d/1ARbNRGDer5vj9qSpRMZFrMkYifGkH3TLtDVp72YbaqU/edit#gid=551506513)   
[Live Preview Demo](https://idems-debug.web.app/template/feature_audio)

## Parameters

| Parameter         | Default     | Description |
| ---------         | ----------- | --------- |
|title	            | Title     | Text to display at top of audio component|
|help	              | null        | Text to display within help-icon popup |
|range_bar_disabled	| false       | Prevent user interacting with playback bar|
|time_to_rewind	    | 15          | Default amount of time to rewind when pressing rewind button |