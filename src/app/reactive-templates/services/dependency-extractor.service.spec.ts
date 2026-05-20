import { TestBed } from "@angular/core/testing";
import { DependencyExtractorService } from "./dependency-extractor.service";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/dependency-extractor.service.spec.ts
 */
describe("DependencyExtractorService", () => {
  let service: DependencyExtractorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependencyExtractorService);
  });

  it("extracts only allowed root dependencies", () => {
    const input = "${local.foo + global.bar + custom.value + system.env}";

    expect(service.extractVariablePaths(input)).toEqual(["local.foo", "global.bar", "system.env"]);
  });

  it("extracts nested paths including loop.item", () => {
    const input = "loop.item && local.foo.bar && system.flags.enabled";

    expect(service.extractVariablePaths(input)).toEqual([
      "loop.item",
      "local.foo.bar",
      "system.flags.enabled",
    ]);
  });

  it("returns empty array when no matches exist", () => {
    expect(service.extractVariablePaths("Math.max(a, b)")).toEqual([]);
  });
});
