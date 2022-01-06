# GDrive Tools


## Developer Notes

### Registering the application
Auth sign-in is handled via an interactive browser, however first the application needs registration with google to allow the prompt. Details to register an application can be found at:

https://developers.google.com/identity/protocols/oauth2 

It is assumed that sharing these credentials are not harmful as long as the `CLIENT_SECRET` is removed (which is not required for javascript applications)

Currently we have a dev credential registered (originally for using the tools with the IDEMS plh project repo), as seen in `credentials.dev.json`


### Known Issues
- Max 1000 files per folder (need to add paging)