/** Params for the `plh_certificate: generate` action */
export interface IPlhCertificateGenerateParams {
  /** ID to use when saving certificate locally (e.g. course_id) */
  id: string;
  /** Full URL of the certificate API (must be absolute, e.g. https://...) */
  url: string;
  /** Name of certificate template to use for certificate generation */
  certificate_template: string;
  /** Parent name to use for certificate generation */
  name: string;
  /** Local variable name to store the certificate response in */
  result_local_variable_name?: string;
  /** Name of data list to update with certificate data */
  certificate_data_list?: string;
}

/** Request body for the certificate generation API */
export interface IPlhCertificateRequestBody {
  template: string;
  name: string;
}

/** Success response from the certificate generation API */
export interface IPlhCertificateSuccessResponse {
  id: string;
  url: string;
}

/** Error response from the certificate generation API */
export interface IPlhCertificateErrorResponse {
  detail: any;
}

/** Response from the certificate generation API */
export type IPlhCertificateResponse = IPlhCertificateSuccessResponse | IPlhCertificateErrorResponse;

/** Response for the `plh_certificate: generate` action */
export interface IPlhCertificateGenerateResponse {
  success: boolean;
  error: boolean;
  data: IPlhCertificateResponse;
}
