import { DataPipe, IDataPipeOperation } from "./pipe";

const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Alice",
      last_name: "Smith",
    },
    {
      id: "id_2",
      first_name: "Bob",
      last_name: "Jones",
    },
  ],
};

const testPipe: IDataPipeOperation[] = [
  {
    input_source: "names",
    operation: "filter",
    args: [""],
  },
];
describe("Data Pipe", () => {});
