import { stubDeploymentConfig } from "./helpers/stub";

// Mock all calls to deployment get
jest.mock("../src/commands/deployment/get", () => ({
  ActiveDeployment: {
    get: jest.fn(),
  },
}));

// Return stubbed deployment from mocked call
stubDeploymentConfig();
