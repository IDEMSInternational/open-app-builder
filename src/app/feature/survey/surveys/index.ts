import WelcomeSurvey from "./welcome.survey";
import AnalyticsSurvey from "./analytics";
import IntroSplashSurvey from "./intro-splash.survey";

/**
 * Each individual survey is collated and exported from here to allow
 * dynamic import and typings
 */
const ALL_SURVEYS = {
  introSplash: IntroSplashSurvey,
  welcome: WelcomeSurvey,
  analytics: AnalyticsSurvey,
};

export default ALL_SURVEYS;
