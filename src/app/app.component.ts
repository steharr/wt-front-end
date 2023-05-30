import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showMenu = false;

  constructor(private router: Router) {
  }

  goToWorkout() {
    this.router.navigate(['workout']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  title = 'workout-tracker';
}
