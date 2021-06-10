import { Injectable } from "@angular/core";
import { BehaviorSubject } from "scripts/node_modules/rxjs";

@Injectable({
  providedIn: "root",
})
export class ReviewingService {
  isReviewingMode$ = new BehaviorSubject(false);
}
