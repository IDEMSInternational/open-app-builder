import type { ICantoRemoteAssetPack } from "data-models";
import {
  findMatchingRemotePack,
  getCantoCustomFieldValue,
  matchesRemoteAssetCondition,
} from "./remote-assets";
import type { CantoManifestEntry } from "./types";

const matchContext = { folderId: "source-folder-id" };

const createFile = (
  overrides: Partial<CantoManifestEntry> & Pick<CantoManifestEntry, "name">
): CantoManifestEntry => ({
  id: "file-id",
  scheme: "image",
  url: { directUrlOriginal: "https://example.com/file.jpg" },
  ...overrides,
});

/** yarn workspace scripts test -t remote-assets.spec.ts */
describe("Canto remote asset matching", () => {
  it("reads string custom field values", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Female" },
    });
    expect(getCantoCustomFieldValue(file, "Caregiver Gender")).toEqual("Female");
  });

  it("reads the first value from array custom fields", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": ["Female", "Male"] },
    });
    expect(getCantoCustomFieldValue(file, "Caregiver Gender")).toEqual("Female");
  });

  it("matches a custom field condition", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Female" },
    });
    expect(
      matchesRemoteAssetCondition(
        file,
        { type: "custom_field", field: "Caregiver Gender", value: "Female" },
        matchContext
      )
    ).toEqual(true);
  });

  it("matches array custom field values", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": ["Female", "Male"] },
    });
    expect(
      matchesRemoteAssetCondition(
        file,
        { type: "custom_field", field: "Caregiver Gender", value: "Male" },
        matchContext
      )
    ).toEqual(true);
  });

  it("matches when all and conditions match", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Female", Age: "Adult" },
    });
    expect(
      matchesRemoteAssetCondition(
        file,
        {
          type: "and",
          conditions: [
            { type: "custom_field", field: "Caregiver Gender", value: "Female" },
            { type: "custom_field", field: "Age", value: "Adult" },
          ],
        },
        matchContext
      )
    ).toEqual(true);
  });

  it("does not match when an and condition fails", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Female", Age: "Child" },
    });
    expect(
      matchesRemoteAssetCondition(
        file,
        {
          type: "and",
          conditions: [
            { type: "custom_field", field: "Caregiver Gender", value: "Female" },
            { type: "custom_field", field: "Age", value: "Adult" },
          ],
        },
        matchContext
      )
    ).toEqual(false);
  });

  it("matches when any or condition matches", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Male" },
    });
    expect(
      matchesRemoteAssetCondition(
        file,
        {
          type: "or",
          conditions: [
            { type: "custom_field", field: "Caregiver Gender", value: "Female" },
            { type: "custom_field", field: "Caregiver Gender", value: "Male" },
          ],
        },
        matchContext
      )
    ).toEqual(true);
  });

  it("returns the first matching remote asset pack", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Female" },
    });
    const remotePacks: ICantoRemoteAssetPack[] = [
      {
        name: "Female Pack",
        condition: { type: "custom_field", field: "Caregiver Gender", value: "Female" },
      },
      {
        name: "Other Pack",
        condition: { type: "custom_field", field: "Caregiver Gender", value: "Female" },
      },
    ];
    expect(findMatchingRemotePack(file, remotePacks, matchContext)?.name).toEqual("Female Pack");
  });

  it("returns undefined when no remote asset pack matches", () => {
    const file = createFile({
      name: "test.jpg",
      additional: { "Caregiver Gender": "Male" },
    });
    const remotePacks: ICantoRemoteAssetPack[] = [
      {
        name: "Female Pack",
        condition: { type: "custom_field", field: "Caregiver Gender", value: "Female" },
      },
    ];
    expect(findMatchingRemotePack(file, remotePacks, matchContext)).toBeUndefined();
  });
});
