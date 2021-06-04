import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CampaignDebugPage } from "./campaign-debug.page";

describe("CampaignDebugPage", () => {
  let component: CampaignDebugPage;
  let fixture: ComponentFixture<CampaignDebugPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignDebugPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDebugPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
