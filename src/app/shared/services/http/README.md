# HTTP Service

## Overview
The HTTP service is used to retrieve data from external sources, with support for request caching,
progress sharing, download abort and failed download retry

It builds on top of the ky http client, as a language-agnostics and more feature rich alternative to angular's own http client.
https://github.com/sindresorhus/ky

Takes inspiration from service worker caching strategies, cacheable-request spec
https://developer.chrome.com/docs/workbox/caching-strategies-overview
https://github.com/jaredwray/cacheable/tree/main/packages/cacheable-request


## Storage Adaptors
As there are typically no universally effective ways to persist data to storage, a series of 
storage adapters are used to handle read/write operations in different environments (e.g. Capacitor Filesystem on native, OPFS on browser).

The architecture uses a **Sidecar Pattern** for performance and resilience on low-resource devices:
- **Atomic Storage**: Each response is stored as two distinct files: `[hash].data` (the raw binary body) and `[hash].meta` (metadata including headers, status, and expiry).
- **URL Hashing**: Keys are generated using a SHA-1 hash of the Request URL. This provides fast, constant-time lookup without the CPU overhead of hashing entire binary blobs.
- **Bypassing the Native Bridge**: On Capacitor, the service uses `Capacitor.convertFileSrc` and native `fetch` to read files directly from the local webserver. This avoids the memory bottleneck of transferring large files as Base64 strings across the Javascript bridge.
- **No Global Manifest**: By avoiding a monolithic JSON index, the app removes I/O bottlenecks during startup and prevents the "Write Contention" corruption risks common in low-connectivity environments.

It takes inspiration from:
- https://github.com/BYOJS/storage
- https://keyv.org/



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

- [ ] Support passing custom _id to requests to subscribe to result elsewhere (possibly as part of download service)

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

https://github.com/jaredwray/keyv
Designed around json-serializable data (no support for binary files, blobs etc.)
Would require custom storage adapters for opfs and capacitor-file