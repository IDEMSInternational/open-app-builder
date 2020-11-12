import { ISODateString } from "@capacitor/core";

export interface IUserGoal {
  id: string;
  _created: ISODateString;
  _modified: ISODateString;
}

export interface IGoalWithMeta extends IUserGoal {
  level: number;
  label: string;
  description: string;
  preRequisites: string[];
  tasks: IGoalTask[];
  progress: number;
}

export interface IGoalTask {
  id: string;
  label: string;
  reminder: "daily";
  count: number;
  // auto populated
  progress: number;
  completionByDay: { [day: string]: boolean };
}

export interface ITaskAction {
  id: string;
  taskId: string;
  timestamp: ISODateString;
}
