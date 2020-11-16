// import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { IonReorderGroup } from "@ionic/angular";
// import { Subscription } from "rxjs";
// import { AnimationOptions } from "ngx-lottie";
// import { isToday, isTomorrow, isPast, differenceInDays } from "date-fns";
// import {
//   IReminder,
//   IReminderTypeMeta,
//   REMINDER_TYPES,
// } from "src/app/feature/reminders/components/_deprecated/reminders.model";
// import { RemindersService } from "src/app/feature/reminders/_deprecated/reminders.service";
// import { IDBDoc } from "src/app/shared/services/db/db.service";
// import { OpenClose } from "../animations";

// @Component({
//   selector: "plh-reminders",
//   templateUrl: "./reminders.page.html",
//   styleUrls: ["./reminders.page.scss"],
//   animations: [OpenClose],
// })
// export class RemindersPage implements OnInit, OnDestroy {
//   reminders$: Subscription;
//   @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
//   reminderTypes = REMINDER_TYPES;
//   reminderGroups = REMINDER_GROUPS_TEMPLATE();
//   activeAnimations: { [reminderId: number]: boolean } = {};
//   tickAnimOptions: AnimationOptions = {
//     loop: false,
//     path: "/assets/lottie-animations/972-done.json",
//   };

//   constructor(private remindersService: RemindersService, private cdr: ChangeDetectorRef) {}
//   ngOnInit() {
//     this.reminders$ = this.remindersService.reminders$.subscribe((reminders) => {
//       const reminderGroups = REMINDER_GROUPS_TEMPLATE();
//       for (const reminder of reminders) {
//         const period = this.getTimePeriod(reminder.due);
//         reminderGroups[period].reminders.push({
//           ...reminder,
//           // populate full type label and meta data
//           typeMeta: this.getReminderTypeMeta(reminder),
//         });
//       }
//       this.reminderGroups = reminderGroups;
//     });
//   }

//   public trackById(index: number, reminder: IReminder & IDBDoc) {
//     return reminder.id;
//   }
//   public toggleGroupExpansion(group: IReminderGroups["past"]) {
//     this.reminderGroups[group._id].expanded = !this.reminderGroups[group._id].expanded;
//     this.cdr.detectChanges();
//   }
//   private getReminderTypeMeta(reminder: IReminder): IReminderTypeMeta {
//     const { type, data } = reminder;
//     if (this.reminderTypes.hasOwnProperty(type)) {
//       const reminderMeta = { ...this.reminderTypes[type] };
//       if (type === "custom") {
//         reminderMeta.label = data.customLabel;
//       }
//       return reminderMeta;
//     } else {
//       // TODO - log error
//       return { type: "custom", label: "", group: "" };
//     }
//   }
//   /**
//    * Create human-readable time period for a given date, whether is
//    * past, today, tomorrow, upcoming (within 5 days), or later
//    */
//   private getTimePeriod(datestring: string): keyof IReminderGroups {
//     const d = new Date(datestring);
//     if (isToday(d)) {
//       return "today";
//     }
//     if (isTomorrow(d)) {
//       return "tomorrow";
//     }
//     if (isPast(d)) {
//       return "past";
//     }
//     if (differenceInDays(d, new Date()) <= 5) {
//       return "upcoming";
//     }
//     return "later";
//   }

//   ngOnDestroy() {
//     this.reminders$.unsubscribe();
//   }

//   /**
//    * When opening the reminder editor generate an editable formgroup object,
//    * based on the new reminder formgroup template and populated with any values
//    */
//   async openReminderEditor(e: Event, reminder?: IReminder) {
//     // e.stopImmediatePropagation();
//     // console.log("open reminder editor", reminder);
//     // const reminderForm = new FormGroup(REMINDER_FORM_TEMPLATE);
//     // if (reminder) {
//     //   reminderForm.patchValue(reminder);
//     // }
//     // const modal = await this.modalCtrl.create({
//     //   component: EditReminderComponent,
//     //   componentProps: { reminderForm },
//     // });
//     // await modal.present();
//     // const { data, role } = await modal.onDidDismiss();
//     // console.log("dismissed", data, role);
//     // if (data) {
//     //   if (role === "delete") {
//     //     await this.remindersService.deleteReminder(reminder);
//     //   } else {
//     //     this.setReminder(data as IReminderWithMeta);
//     //   }
//     // }
//   }

//   /**
//    * When a reminder complete status is toggled update the database and trigger any animations
//    * NOTE - the update triggers a full db fetch/re-render so any other in-progress animations
//    * will be restarted if a new reminder checked (minor bug/limitation)
//    */
//   async toggleReminderComplete(e: Event, reminder: IReminderWithMeta & IDBDoc) {
//     e.stopImmediatePropagation();
//     await this.setReminder({ ...reminder, complete: !reminder.complete });
//     if (!reminder.complete) {
//       this.activeAnimations[reminder.id] = true;
//     }
//   }

//   tickAnimationComplete(reminder: IReminderWithMeta & IDBDoc) {
//     this.activeAnimations[reminder.id] = false;
//   }

//   setReminder(reminderWithMeta: IReminderWithMeta) {
//     console.log("update reminder", reminderWithMeta);
//     // remove metadata
//     delete reminderWithMeta.typeMeta;
//     const reminder: IReminder = {
//       ...reminderWithMeta,
//       _modified: new Date().toISOString(),
//     };
//     return this.remindersService.setReminder(reminder);
//   }
// }

// interface IReminderWithMeta extends IReminder {
//   typeMeta: IReminderTypeMeta;
// }
// type IReminderGroupName = "past" | "today" | "tomorrow" | "upcoming" | "later";
// type IReminderGroups = {
//   [key in IReminderGroupName]: IReminderGroup;
// };
// interface IReminderGroup {
//   _id: IReminderGroupName;
//   expanded: boolean;
//   label: string;
//   reminders: IReminderWithMeta[];
// }
// /**
//  * Use a function to generate a blank template for storing reminders
//  * (regular consts keep references and so would constantly update instead of starting new.
//  * This usually can be fixed with object assign or spread operators but unhappy when used here)
//  */
// const REMINDER_GROUPS_TEMPLATE = (): IReminderGroups => ({
//   past: { _id: "past", label: "Past", reminders: [], expanded: false },
//   today: { _id: "today", label: "Today", reminders: [], expanded: true },
//   tomorrow: {
//     _id: "tomorrow",
//     label: "Tomorrow",
//     reminders: [],
//     expanded: false,
//   },
//   upcoming: {
//     _id: "upcoming",
//     label: "This Week",
//     reminders: [],
//     expanded: false,
//   },
//   later: { _id: "later", label: "Later", reminders: [], expanded: false },
// });
