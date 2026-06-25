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

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "local", name: "foo" },
      { type: "global", name: "bar" },
      { type: "system", name: "env" },
    ]);
  });

  it("extracts nested paths including loop.item", () => {
    const input = "loop.item && local.foo.bar && system.flags.enabled";

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "loop", name: "item" },
      { type: "local", name: "foo.bar" },
      { type: "system", name: "flags.enabled" },
    ]);
  });

  it("treats standalone item token as loop.item shorthand", () => {
    const input = "item && global.bar";

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "loop", name: "item" },
      { type: "global", name: "bar" },
    ]);
  });

  it("expands item nested access to loop.item path", () => {
    const input = "item.id && item.meta.value";

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "loop", name: "item.id" },
      { type: "loop", name: "item.meta.value" },
    ]);
  });

  it("supports mixed shorthand and explicit loop references", () => {
    const input = "item.name + loop.index + loop.item.count";

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "loop", name: "item.name" },
      { type: "loop", name: "index" },
      { type: "loop", name: "item.count" },
    ]);
  });

  it("template mode ignores plain text and extracts only placeholder dependencies", () => {
    const input = "${loop.index} of ${loop.count} item";

    expect(service.extractVariableReferences(input, "string")).toEqual([
      { type: "loop", name: "index" },
      { type: "loop", name: "count" },
    ]);
  });

  it("template mode supports item shorthand inside placeholders", () => {
    const input = "${item.name} of ${loop.count} item";

    expect(service.extractVariableReferences(input, "string")).toEqual([
      { type: "loop", name: "item.name" },
      { type: "loop", name: "count" },
    ]);
  });

  it("does not rewrite non-standalone item-like identifiers", () => {
    const input = "local.myitem + custom.item + local.items";

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "local", name: "myitem" },
      { type: "local", name: "items" },
    ]);
  });

  it("supports index access in paths", () => {
    const input = 'local.myitem["0"].foo + local.myitem["my_index"].foo';

    expect(service.extractVariableReferences(input)).toEqual([
      { type: "local", name: "myitem.0.foo" },
      { type: "local", name: "myitem.my_index.foo" },
    ]);
  });

  it("returns empty array when no matches exist", () => {
    expect(service.extractVariableReferences("Math.max(a, b)")).toEqual([]);
  });
});
