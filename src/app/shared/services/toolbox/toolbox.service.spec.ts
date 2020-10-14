import { TestBed } from '@angular/core/testing';
import { fstat } from 'fs';
import { ToolboxTopic } from './toolbox.model';

import { ToolboxService } from './toolbox.service';

describe('ToolboxService', () => {
  let service: ToolboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let expectedInitialTopics: ToolboxTopic[] = [{ "type": "ONE_ON_ONE_TIME", "languageCode": "en", "name": "One-on-One Time", "buttonColor": "#F7911E", "unlocked": false, "pages": [] }, { "type": "PRAISE_AND_POSITIVE_REINFORCEMENT", "languageCode": "en", "name": "Praise & Positive Reinforcement", "buttonColor": "#ED1651", "unlocked": false, "pages": [] }, { "type": "MANAGING_ANGER_AND_STRESS", "languageCode": "en", "name": "Managing Anger & Stress", "buttonColor": "#5652A3", "unlocked": false, "pages": [] }, { "type": "FAMILY_BUDGETING", "languageCode": "en", "name": "Family Budgeting", "buttonColor": "#8885D1", "unlocked": false, "pages": [] }, { "type": "RULES_AND_ROUTINES", "languageCode": "en", "name": "Rules & Routines", "buttonColor": "#54C5D0", "unlocked": false, "pages": [] }, { "type": "ACCEPTING_RESPONSIBILITY", "languageCode": "en", "name": "Accepting Responsibilities", "buttonColor": "#0F8AB2", "unlocked": false, "pages": [] }, { "type": "PROBLEM_SOLVING", "languageCode": "en", "name": "Problem Solving", "buttonColor": "#2E9E48", "unlocked": false, "pages": [] }, { "type": "RISK_MAPPING_AND_DEALING_WITH_CRISIS", "languageCode": "en", "name": "Risk Mapping & Dealing with Crisis", "buttonColor": "#227535", "unlocked": false, "pages": [] }]

  it('should return the topics as all locked', () => {
    service.getTopics().subscribe((topics) => {
      expect(topics).toEqual(expectedInitialTopics);
    });
  });
});
