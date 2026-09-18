import * as fs from "fs-extra";
import * as path from "path";
import { createTempDir, replicateDir, setNestedProperty } from "./file-utils";

describe("replicateDir", () => {
  const srcMtime = new Date("2020-01-01T00:00:00.000Z");
  let src: string;
  let target: string;
  beforeEach(() => {
    src = createTempDir();
    target = createTempDir();
    fs.writeFileSync(path.resolve(src, "file.json"), "{}");
    fs.utimesSync(path.resolve(src, "file.json"), srcMtime, srcMtime);
  });
  afterEach(() => {
    fs.removeSync(src);
    fs.removeSync(target);
  });
  it("Preserves src modified time by default", () => {
    replicateDir(src, target);
    const { mtime } = fs.statSync(path.resolve(target, "file.json"));
    expect(mtime).toEqual(srcMtime);
  });
  it("Uses current time as modified time when preserveTimestamps false", () => {
    const startTime = Date.now();
    replicateDir(src, target, { preserveTimestamps: false });
    const { mtimeMs } = fs.statSync(path.resolve(target, "file.json"));
    // allow for filesystem timestamp precision
    expect(mtimeMs).toBeGreaterThan(startTime - 1000);
  });
  it("Removes target files not in src, except keepTargetFiles", () => {
    fs.writeFileSync(path.resolve(target, "removed.json"), "{}");
    fs.writeFileSync(path.resolve(target, "kept.json"), "{}");
    replicateDir(src, target, { keepTargetFiles: ["kept.json"] });
    expect(fs.readdirSync(target).sort()).toEqual(["file.json", "kept.json"]);
  });
});

describe("setNestedProperty", () => {
  it("Sets object deep property", () => {
    const res = setNestedProperty("a.b.c", 1);
    expect(res).toEqual({ a: { b: { c: 1 } } });
  });
  it("Preserves deep properties", () => {
    const obj = { a: { b: { d: 2 } } };
    const res = setNestedProperty<any>("a.b.c", 1, obj);
    expect(res).toEqual({ a: { b: { c: 1, d: 2 } } });
  });
  it("Supports variable properties", () => {
    const varProperty = "c";
    const res = setNestedProperty<any>(`a.b.${varProperty}`, 1);
    expect(res).toEqual({ a: { b: { c: 1 } } });
  });
});
