# HTTP Service

## Overview
The HTTP service is used to retrieve data from external sources, with support for request caching,
progress sharing, download abort and failed download retry

It builds on top of the ky http client, as a language-agnostics and more feature rich alternative to angular's own http client.
https://github.com/sindresorhus/ky

Takes inspiration from service worker caching strategies, cacheable-request spec and tanstackQuery
https://developer.chrome.com/docs/workbox/caching-strategies-overview
https://github.com/jaredwray/cacheable/tree/main/packages/cacheable-request


## Storage Adaptors
As there are typically no universally effective ways to persist data to storage, a series of 
storage adapters are used to handle read/write operations in different environments

All storage adapters are 2-layered.
An L1 layer stores in-memory lists of known files and response values for data retrieved multiple times within a session. An L2 layer stores to a permanent storage location, such as FileSystem, OPFS and IndexedDB

It takes inspiration from:
- https://github.com/BYOJS/storage
- https://keyv.org/

It could be further extended in the future if writing as adaptor for [keyv](https://github.com/jaredwray/keyv), enabling functionality such as pre/post operation hooks and custom data serialization (although focus of keyv is more on database data storage than file storage)

## Template Interaction

(TODO)

The service populates download progress and status to the `@data._http` table, and stores cached
responses locally (file system on native devices, OPFS on browser with indexeddb fallback (?) )

It can be called directly through authored actions, or integrated into specific components (e.g. image)


(todo - markdown table example)
```

```



Inspiration:
- https://tanstack.com/query/latest/docs/framework/react/overview

## TODOs

- [ ] Component support 
E.g Image component properties - `cache` (no expiry), `cache: 30d`. A separate `cache_update` parameter can be included to force update after response. 

E.g. `external_data` component to handle fetch and map to data_items
Or would it just wrap other components? E.g.
```ts
<data-download #item ['parameter_list']={cache_expiry: '30d', autodownload:false}>
    <tmpl-component [value]="download.start()">
    <tmpl-component [value]="download.stop()">
    <tmpl-component [value]="download.status()">
    <tmpl-component [value]="download.progress()">
    <tmpl-component [value]="download.value()" />
    <tmpl-component [value]="download.source()" />
</data-download>

<data-download>
<api-data>
// similar wrapper for db queries? or is this just data-items?
<db-query>
```

- [ ] Local storage table for cache entries, just metadata (status, content-type, size, expiry)

- [ ] Response body parsing and store. OPFS / File-based downloads cache

- [ ] Move actions to child component/feature

- [ ] Demo sheet, showing full cache, button to clear cache, way to download image with custom expiry,
remove item from cache, bypass cache etc.

- System cache - start as tmp folder, clean on init and move when downloads complete
- Rename as `downloads.service`? Or possibly create new downloads service that builds on top of core?
- Handle network update if data changed/not (opfs supports write to tmp file and rename - probably want similar for capacitor)


## FAQs

- Why not use the angular http client directly
Cross-browser support and compatibility

- Why not use service workers
Not available in native builds

- Why not use [insert tool name here]

A number of popular tools were evaluated when considering ways to enable request caching

*Must Haves*
Run both in browser and on native device
Support for binary/blob response formats (e.g. images)

*Nice to Haves*
Efficient read/write mechanisms (e.g. prefer native file over in-memory data for large binary files)
Language agnostic. Angular-specific might be prone to breaking with major platform updates, also potential use in other projects

Some popular options which were evaluated (and ruled out)

https://github.com/jaredwray/cacheable/tree/main/packages/cacheable-request
Only supports Node environment (not browser). Similar for underlying `cacheable` package.

https://github.com/sindresorhus/got
Uses cacheable-request under the hood, so again only supports node

https://www.npmjs.com/package/@ngneat/cashew
Angular specific. Designed as global interceptor, not service-specific

https://www.npmjs.com/package/ng-http-caching
Angular specific. Binary cache strategies (cache or not), no support of cache-first / network-first with fallback