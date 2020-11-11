import { ISurvey } from "../types/survey.types";

/**
 * Preview the survey by copying the surveyJson into
 * https://surveyjs.io/create-survey
 *
 * Changelog:
 *
 */
const WelcomeSurvey: ISurvey = {
  allowRepeats: false,
  version: 1,
  // Note - this upgrade isn't required, just for reference
  upgrade: {
    1: (values) => {
      return values;
    },
  },
  surveyId: "welcome",
  surveyJson: {
    pages: [
      {
        title: "Welcome Survey",
        name: "Welcome",
        elements: [
          {
            type: "text",
            name: "name",
            title: "Name",
            description: "Hi, welcome! What is your name?",
            isRequired: true,
          },
          {
            type: "dropdown",
            name: "language",
            title: "Language",
            description: "Please tell us which language you would like",
            isRequired: true,
            choices: [
              {
                value: "English",
                text: "English",
              },
              {
                value: "Chinese",
                text: "Chinese",
              },
              {
                value: "Arabic",
                text: "Arabic",
              },
            ],
          },
        ],
        questionTitleLocation: "top",
      },
    ],
    showPageTitles: true,
    // showProgressBar: "bottom",
    // progressBarType: "questions",
  },
};

export default WelcomeSurvey;
