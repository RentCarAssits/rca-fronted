import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefDialogServiceService {
  private registerCompletedSource = new Subject<void>();
  registerCompleted$ = this.registerCompletedSource.asObservable();

  registerCompleted() {
    this.registerCompletedSource.next();
  }

}
