import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions } from "chart.js";
import { format } from "date-fns";
import { Label } from "ng2-charts";
import { IGoalTask, IGoalWithMeta } from "../../models/goals.model";
import { GoalsService } from "../../services/goals.service";

@Component({
  selector: "plh-my-goals",
  templateUrl: "./my-goals.component.html",
  styleUrls: ["./my-goals.component.scss"],
})
export class MyGoalsComponent implements OnInit {
  userGoals: any[] = [];
  userGoalIds: any[] = [];
  allGoals: any[] = [];
  taskReminders: IGoalTask[] = [];
  DAY_STRING = format(new Date(), "yyyy-MM-dd");

  public chartOptions: ChartOptions = {
    responsive: true,
    legend: { display: false },
    cutoutPercentage: 75,
    tooltips: { enabled: false },
  };

  public chartLabels: Label[] = ["", ""];
  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.loadGoals();
  }
  async loadGoals() {
    await this.goalsService.loadGoals();
    this.userGoals = this.goalsService.userGoals.map((goal) => ({
      ...goal,
      chartData: this.generateChartData(goal),
    }));
    console.log("user goals", this.userGoals);
    this.allGoals = this.goalsService.allGoals;
    this.userGoalIds = this.goalsService.userGoals.map((g) => g.id);
    this.taskReminders = this.goalsService.taskReminders;
  }

  private generateChartData(goal: IGoalWithMeta) {
    const chartData: ChartDataSets[] = [
      {
        data: [goal.progress, 100 - goal.progress],
        backgroundColor: ["hsl(50,50%,75%)", undefined],
        borderWidth: 0,
      },
    ];
    return chartData;
  }

  /**
   * Brief method to handle updating of database objects when goals are toggled on/off
   * Note - in future this can be made much simpler by using a dedicated select page
   */
  async setGoals(goalIds: string[]) {
    const addedGoals = goalIds.filter((id) => !this.userGoalIds.includes(id));
    const removedGoals = this.userGoalIds.filter((id) => !goalIds.includes(id));
    if (addedGoals.length > 0 || removedGoals.length > 0) {
      for (const id of addedGoals) {
        await this.goalsService.addGoal(id);
      }
      for (const id of removedGoals) {
        await this.goalsService.deleteGoal(id);
      }
      await this.loadGoals();
    }
  }

  public async toggleTaskComplete(task: IGoalTask) {
    if (task.completionByDay[this.DAY_STRING] === true) {
      await this.goalsService.removeTaskAction(task.id, this.DAY_STRING);
    } else {
      await this.goalsService.addTaskAction(task.id, this.DAY_STRING);
    }
    await this.loadGoals();
  }

  /**
   * Lookup function used by select picker to determine whether a specific
   * goal should be checked or not
   */
  goalSelectCompare = (goalId: string) => {
    return this.userGoalIds.includes(goalId);
  };
}

/*********** WiP / Deprecated **********************/

// public radarChartOptions: RadialChartOptions = {
//   responsive: true,
//   legend: { display: false },
//   scale: { ticks: { stepSize: 100, display: false } },
// };

// public radialChartData: ChartDataSets[] = [
//   {
//     data: [25, 50, 100],
//     label: "Series A",
//     backgroundColor: [
//       "hsl(50,50%,75%)",
//       "hsl(75,50%,75%)",
//       "hsl(100,50%,75%)",
//     ],
//     borderColor: ["hsl(50,50%,70%)", "hsl(75,50%,70%)", "hsl(100,50%,70%)"],
//     borderWidth: 2,
//   },
// ];
