import { fakeAsync, tick } from "@angular/core/testing";
import { Capacitor } from "@capacitor/core";
import { FlowTypes } from "data-models";
import { PersistedMemoryAdapter } from "./persistedMemory";
import { FilePersistenceStrategy } from "./persistence/file.strategy";
import { IndexedDBPersistenceStrategy } from "./persistence/indexeddb.strategy";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/dynamic-data/adapters/persistedMemory.spec.ts
 */

describe("PersistedMemoryAdapter", () => {
  let adapter: PersistedMemoryAdapter;
  const dbName = "test-db";

  beforeEach(() => {
    // Reset mocks/spies for strategies
    spyOn(IndexedDBPersistenceStrategy.prototype, "init").and.resolveTo();
    spyOn(IndexedDBPersistenceStrategy.prototype, "load").and.resolveTo({});
    spyOn(IndexedDBPersistenceStrategy.prototype, "save").and.resolveTo();
    spyOn(IndexedDBPersistenceStrategy.prototype, "clear").and.resolveTo();

    spyOn(FilePersistenceStrategy.prototype, "init").and.resolveTo();
    spyOn(FilePersistenceStrategy.prototype, "load").and.resolveTo({});
    spyOn(FilePersistenceStrategy.prototype, "save").and.resolveTo();
    spyOn(FilePersistenceStrategy.prototype, "clear").and.resolveTo();

    adapter = new PersistedMemoryAdapter(dbName);
  });

  describe("create", () => {
    it("should use IndexedDBPersistenceStrategy on web (non-native)", async () => {
      spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
      await adapter.create();
      expect(IndexedDBPersistenceStrategy.prototype.init).toHaveBeenCalled();
      expect(IndexedDBPersistenceStrategy.prototype.load).toHaveBeenCalled();
      // Ensure file strategy not called
      expect(FilePersistenceStrategy.prototype.init).not.toHaveBeenCalled();
    });

    it("should use FilePersistenceStrategy on native platform", async () => {
      spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
      await adapter.create();
      expect(FilePersistenceStrategy.prototype.init).toHaveBeenCalled();
      expect(FilePersistenceStrategy.prototype.load).toHaveBeenCalled();
      expect(IndexedDBPersistenceStrategy.prototype.init).not.toHaveBeenCalled();
    });

    it("should load state from strategy", async () => {
      spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
      const mockState = { data_list: { test: { "1": { id: "1" } } } } as any;
      (IndexedDBPersistenceStrategy.prototype.load as jasmine.Spy).and.resolveTo(mockState);

      await adapter.create();
      expect(adapter.state).toEqual(mockState);
    });
  });

  describe("operations", () => {
    beforeEach(async () => {
      spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
      await adapter.create();
    });

    describe("get", () => {
      it("should return the flow data if it exists", () => {
        const flowType: FlowTypes.FlowType = "data_list";
        const flowName = "testFlow";
        const mockData = { id1: { id: "id1" } };
        adapter.state = { [flowType]: { [flowName]: mockData } };

        const result = adapter.get(flowType, flowName);
        expect(result).toEqual(mockData);
      });

      it("should return undefined if flow does not exist", () => {
        const result = adapter.get("data_list", "nonExistent");
        expect(result).toBeUndefined();
      });
    });

    describe("set", () => {
      it("should set data for a flow and persist state", fakeAsync(() => {
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { val: 1 },
        };

        adapter.set(update);

        expect(adapter.state["data_list"]["testFlow"]["id1"]).toEqual({ val: 1 });

        // Should be debounced
        expect(IndexedDBPersistenceStrategy.prototype.save).not.toHaveBeenCalled();
        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalled();
      }));

      it("should overwrite existing data", () => {
        adapter.state = {
          data_list: {
            testFlow: {
              id1: { old: 1 },
            },
          },
        };
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { new: 2 },
        };
        adapter.set(update);
        expect(adapter.state["data_list"]["testFlow"]["id1"]).toEqual({ new: 2 });
      });

      it("should remove undefined values from data", () => {
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { val: 1, toRemove: undefined },
        };
        adapter.set(update);
        expect(adapter.state["data_list"]["testFlow"]["id1"]).toEqual({ val: 1 });
        expect(adapter.state["data_list"]["testFlow"]["id1"].toRemove).toBeUndefined();
      });
    });

    describe("update", () => {
      it("should merge data for a flow and persist state", fakeAsync(() => {
        const existing = { val: 1, other: 2 };
        adapter.state = {
          data_list: {
            testFlow: {
              id1: existing,
            },
          },
        };

        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { val: 99, newProp: 3 },
        };

        adapter.update(update);

        const entry = adapter.state["data_list"]["testFlow"]["id1"];
        expect(entry.val).toEqual(99);
        expect(entry.other).toEqual(2);
        expect(entry.newProp).toEqual(3);

        // Should be debounced
        expect(IndexedDBPersistenceStrategy.prototype.save).not.toHaveBeenCalled();
        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalled();
      }));

      it("should deep merge data", () => {
        adapter.state = {
          data_list: {
            testFlow: {
              id1: { nested: { a: 1 } },
            },
          },
        };
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { nested: { b: 2 } },
        };
        adapter.update(update);
        expect(adapter.state.data_list.testFlow.id1.nested).toEqual({ a: 1, b: 2 });
      });

      it("should handle update on non-existent entry", () => {
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id2",
          data: { val: 1 },
        };
        adapter.update(update);
        expect(adapter.state["data_list"]["testFlow"]["id2"]).toEqual({ val: 1 });
      });

      it("should remove undefined values during merge", () => {
        adapter.state = {
          data_list: {
            testFlow: {
              id1: { val: 1, toRemove: 2 },
            },
          },
        };
        const update = {
          flow_type: "data_list" as FlowTypes.FlowType,
          flow_name: "testFlow",
          id: "id1",
          data: { val: 3, toRemove: undefined },
        };
        adapter.update(update);
        const entry = adapter.state["data_list"]["testFlow"]["id1"];
        expect(entry.val).toEqual(3);
        expect(entry.toRemove).toBeUndefined();
        expect("toRemove" in entry).toBeFalse();
      });
    });

    describe("delete", () => {
      beforeEach(() => {
        adapter.state = {
          data_list: {
            testFlow: {
              id1: { val: 1 },
              id2: { val: 2 },
            },
          },
        };
      });

      it("should delete specific ids", fakeAsync(() => {
        const promise = adapter.delete("data_list", "testFlow", ["id1"]);

        expect(adapter.state["data_list"]["testFlow"]["id1"]).toBeUndefined();
        expect(adapter.state["data_list"]["testFlow"]["id2"]).toBeDefined();

        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalled();
      }));

      it("should clear flow if no ids provided", fakeAsync(() => {
        const promise = adapter.delete("data_list", "testFlow");

        expect(adapter.state["data_list"]["testFlow"]).toEqual({});

        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalled();
      }));

      it("should do nothing if flow does not exist", fakeAsync(() => {
        adapter.delete("data_list", "nonExistent");
        // State remains same
        expect(adapter.state["data_list"]["testFlow"]).toBeDefined();
        // save not called (well, ensure it wasn't called for this op)
        // Since persistStateToDB is only called if it proceeds
        expect(IndexedDBPersistenceStrategy.prototype.save).not.toHaveBeenCalled();
        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).not.toHaveBeenCalled();
      }));
    });

    describe("deleteAll", () => {
      it("should reset state and persist", fakeAsync(() => {
        adapter.state = {
          data_list: {
            testFlow: {
              id1: { val: 1 },
            },
          },
        };
        const promise = adapter.deleteAll();

        expect(adapter.state).toEqual({});

        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalledWith({});
      }));
    });

    describe("persistStateToDB", () => {
      it("should be debounced", fakeAsync(() => {
        adapter.persistStateToDB();
        adapter.persistStateToDB();
        adapter.persistStateToDB();

        expect(IndexedDBPersistenceStrategy.prototype.save).not.toHaveBeenCalled();
        tick(500);
        expect(IndexedDBPersistenceStrategy.prototype.save).toHaveBeenCalledTimes(1);
      }));
    });
  });
});
