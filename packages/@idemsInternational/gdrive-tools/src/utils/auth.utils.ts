import type { IAuthorizeOptions } from '../types';
import {AUTH_CREDENTIALS_PATH,AUTH_TOKEN_PATH} from '../paths'

/** Small utility to return default auth token and credential paths when not provided */
export function getAuthPaths(options:IAuthorizeOptions){
    const {authTokenPath=AUTH_TOKEN_PATH, credentialsPath=AUTH_CREDENTIALS_PATH} = options
    return {authTokenPath,credentialsPath}
}