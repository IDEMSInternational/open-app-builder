import { signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { TemplateAssetService } from "../../../services/template-asset.service";
import { RadioButtonGridCardComponent } from "./radio-button-grid-card.component";

describe("RadioButtonGridCardComponent", () => {
  it("renders a radio card for each option", () => {
    TestBed.configureTestingModule({
      imports: [RadioButtonGridCardComponent],
      providers: [
        {
          provide: TemplateAssetService,
          useValue: { getTranslatedAssetSignal: (path: string) => signal(`assets/${path}`) },
        },
      ],
    });
    const fixture = TestBed.createComponent(RadioButtonGridCardComponent);
    fixture.componentRef.setInput("answerOptions", [
      { name: "option_1", text: "First", image: "first.png" },
      { name: "option_2", text: "Second" },
    ]);
    fixture.componentRef.setInput("value", "option_2");
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelectorAll("ion-radio").length).toBe(2);
    expect(element.querySelector("img.item-image")?.getAttribute("src")).toBe("assets/first.png");
    expect(element.textContent).toContain("Second");
  });
});
