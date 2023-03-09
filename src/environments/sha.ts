/**
 * Short Sha code of git head commit (first 8 characters). Will be populated during CI via
 * ```sh
 * git rev-parse --short=8 HEAD
 * ```
 */
export const GIT_SHA = "";
