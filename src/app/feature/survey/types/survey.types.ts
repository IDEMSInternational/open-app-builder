export interface ISurvey {
  version: number;
  allowRepeats: boolean;
  /**
   * Specify any migration logic required for a given suvey version
   * This is required when either adding or removing questions
   * NOTE - an index of '3' would define the function executed on upgrade
   * from 2 -> 3
   */
  upgrade: { [versionNumber: number]: (oldValues: any) => any };
  surveyId: string;
  /** Surveys can be defined and processed via surveyJS,
   *  Design at: https://surveyjs.io/Survey/Builder/
   * (note strict typing not possiblehttps://github.com/surveyjs/survey-library/issues/129 )
   */
  surveyJson?: {
    title?: string;
    pages: {
      name: string;
      title?: string;
      elements: any[];
      [key: string]: any;
    }[];
    [key: string]: any;
  };
  /**
   * Surveys can also be defined via custom components for fully bespoke surveys
   * This must have a corresponding custom form definition also
   */
  surveyCustomComponent?: any;
  /**
   * A custom form must be provided when using a custom survey component. This will be in the
   * format of a json object that can be parsed by Angular formbuilder
   * https://angular.io/guide/reactive-forms#using-the-formbuilder-service-to-generate-controls
   */
  surveyCustomForm?: any;
}

export interface ISurveyResponse {
  _isCompleted: boolean;
  _lastModified: ISOString;
  surveyId: string;
  values: any;
  version: number;
}

type ISOString = string;
