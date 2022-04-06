export interface ISurvey {
  surveyId: string;
  /**
   * Surveys can also be defined via custom components for fully bespoke surveys
   * This must have a corresponding custom form definition also
   */
  surveyCustomComponent: any;
}

export interface ISurveyResponse {
  _isCompleted: boolean;
  _lastModified: ISOString;
  surveyId: string;
  values: any;
  version: number;
}

type ISOString = string;
