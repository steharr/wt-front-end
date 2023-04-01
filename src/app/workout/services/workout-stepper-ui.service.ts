import {Injectable} from '@angular/core';
import {Subject, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkoutStepperUiService {

  private loading = new Subject<boolean>;
  public loading$ = this.loading.asObservable();

  private interval$: any;
  private dotNumber = 0;
  private saveDots = new Subject<number>;
  public saveDots$ = this.saveDots.asObservable();

  constructor() {
  }

  setLoading(value: boolean = false) {
    this.loading.next(value);
  }

  triggerDotsAnimation(finish = false) {
    if (!finish) {
      this.interval$ = timer(0, 1000).forEach(n => {
        this.dotNumber = this.dotNumber + 1;
        if (this.dotNumber > 3) {
          this.dotNumber = 0;
        }
        this.saveDots.next(this.dotNumber);
      })
    }

  }


}
