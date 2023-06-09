import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AccountDetails } from './account/models/account-details.model';
import { AccountService } from './account/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showMenu = false;
  isLoggedIn$ = this.accountService.isLoggedIn$;
  accountDetails: AccountDetails | null = null;
  navigationEnd$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  );

  constructor(private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.navigationEnd$.subscribe(() => {
      if (this.accountDetails === null) {
        this.getDetails();
      }
    });
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

  logout() {
    this.accountService.logoutUser();
  }

  private getDetails() {
    this.accountService.details().subscribe({
      next: (deets) => {
        if (deets !== null) {
          this.accountDetails = deets;
          this.accountService.updateLoginStatus(true);
        }
      },
    });
  }

  title = 'workout-tracker';
}
