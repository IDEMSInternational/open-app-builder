- [ ] Improve support for streaming responses to file, e.g. http.worker `const blob = await response.blob();`

> Using response.blob() reads the entire file into the worker's memory. For the 'Large Media' files this service is intended for, this could lead to Out-Of-Memory (OOM) issues, especially on resource-constrained mobile devices. While iOS has limitations with WritableStream, consider using a chunked read/write approach if the file size exceeds a certain threshold.


- [ ] Add support for progress updates

- [ ] Identify best solution for bypassing cors

Many websites will load assets directly in html image tags but refuse programmatic retrieval via cors. So may need a cors proxy or alt fix for web