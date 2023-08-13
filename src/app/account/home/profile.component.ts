import { Component, OnInit } from '@angular/core';
import { AccountDetails } from '../models/account-details.model';
import { AccountService } from '../services/account.service';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  AVATAR_KEY: string = 'profile-avatar-94';
  profileAvatar!: Document;
  accountDetails!: AccountDetails;

  constructor(
    private accountService: AccountService,
    private avatarService: AvatarService
  ) {}

  ngOnInit(): void {
    this.accountService.details().subscribe({
      next: (details) => {
        this.accountDetails = details;
        this.profileAvatar = this.avatarService.createAvatar(details);
        document
          .getElementById(this.AVATAR_KEY)
          ?.appendChild(this.profileAvatar.documentElement);
      },
    });
  }
}
