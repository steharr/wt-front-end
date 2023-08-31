import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
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
      },
    });

    this.avatarService.getAndPrintAvatarToKey(this.AVATAR_KEY);

    combineLatest([this.avatarService.userAvatar$]).subscribe({
      next: ([updatedAvatar]) => {
        if (updatedAvatar !== null) {
          this.avatarService.printAvatarToKey(
            updatedAvatar,
            this.AVATAR_KEY,
            true
          );
        }
      },
    });
  }
}
