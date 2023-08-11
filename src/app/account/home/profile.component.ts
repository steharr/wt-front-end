import { Component, OnInit } from '@angular/core';
import { funEmoji } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { AccountDetails } from '../models/account-details.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  AVATAR_KEY: string = 'profile-avatar-94';
  profileAvatar!: Document;
  accountDetails!: AccountDetails;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.details().subscribe({
      next: (details) => {
        this.accountDetails = details;
        const avatar = createAvatar(funEmoji, {
          seed: details.username,
        });
        var parser = new DOMParser();
        this.profileAvatar = parser.parseFromString(
          avatar.toString(),
          'image/svg+xml'
        );

        document
          .getElementById(this.AVATAR_KEY)
          ?.appendChild(this.profileAvatar.documentElement);
      },
    });
  }
}
