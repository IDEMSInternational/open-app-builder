import searchResponse from "./sample_responses/search";
import folderResponse from "./sample_responses/folder";
import batchDetailsResponse from "./sample_responses/batch-content";

export type CantoResponseSearch = typeof searchResponse;
export type CantoResponseSearchUnderFolder = typeof folderResponse;
export type CantoResponseBatchContentDetails = typeof batchDetailsResponse;
export type CantoManifest = typeof batchDetailsResponse.docResult;
export type CantoManifestEntry = (typeof batchDetailsResponse.docResult)[0];
