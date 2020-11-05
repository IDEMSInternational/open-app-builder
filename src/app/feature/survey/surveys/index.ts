import WelcomeSurvey from "./welcome.survey";
import AnalyticsSurvey from "./analytics";

/**
 * Each individual survey is collated and exported from here to allow
 * dynamic import and typings
 */
const ALL_SURVEYS = {
  welcome: WelcomeSurvey,
  analytics: AnalyticsSurvey,
};

export default ALL_SURVEYS;
