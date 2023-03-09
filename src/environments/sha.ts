/**
 * Short Sha code of git head commit (first 6 characters). Will be populated during CI via
 * ```sh
 * git rev-parse --short=6 HEAD
 * ```
 */
export const GIT_SHA = "";
