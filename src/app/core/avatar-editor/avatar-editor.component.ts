import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { AvatarService } from 'src/app/account/services/avatar.service';
import {
  AvatarOptions,
  Eyes,
  Hairs,
} from 'src/app/core/avatar-editor/models/avatar-options.model';
import { ToastService } from 'src/app/core/toast/toast.service';
import { AvatarDetails } from '../../core/avatar-editor/models/avatar-details.model';
import { AvatarDefaults } from './constants/avatar-defaults.constant';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
})
export class AvatarEditorComponent implements OnInit, AfterViewInit {
  @Input() header: string = '';
  @Input() showOptions: boolean = false;
  @Output() saveEvent = new EventEmitter<AvatarDetails>();
  @Output() closeEvent = new EventEmitter<AvatarDetails>();
  @Output() changeEvent = new EventEmitter<AvatarDetails>();

  AVATAR_KEY: string = crypto.randomUUID();
  profileAvatar!: Document;
  dirs = Direction;
  chg = AvatarChange;
  options!: AvatarOptions;
  details: AvatarDetails = {
    avatarEyes: AvatarDefaults.DEFAULT_EYES,
    avatarHair: AvatarDefaults.DEFAULT_HAIR,
  };

  constructor(
    private avatarService: AvatarService,
    private toastService: ToastService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.avatarService.options().subscribe({
      next: (data) => {
        this.options = data;
      },
    });
  }
  ngAfterViewInit(): void {
    this.initializeAvatar();
  }
  shift(change: AvatarChange, dir: Direction) {
    if (null !== this.options && null !== this.details) {
      this.updateAvatar(this.details, dir, change);
    }
  }

  save(): void {
    this.saveEvent.emit(this.details);
  }
  close() {
    this.closeEvent.emit(this.details);
  }

  private initializeAvatar() {
    const avatar = this.avatarService.createAvatarFromAvatarDetails(
      this.details
    );
    this.avatarService.printAvatarToKey(avatar, this.AVATAR_KEY, false);
  }

  private updateAvatar(
    accountDetails: AvatarDetails,
    dir: Direction,
    change: AvatarChange
  ) {
    let newAccountDetails: AvatarDetails = { ...this.details };

    let choicesList =
      AvatarChange.HAIR == change
        ? this.options.hairChoices
        : this.options.eyeChoices;

    const currentAvatarDetail =
      AvatarChange.HAIR == change
        ? accountDetails.avatarHair
        : accountDetails.avatarEyes;
    const index = choicesList.findIndex((val) => val === currentAvatarDetail);
    const newIndex = index + (Direction.RIGHT == dir ? +1 : -1);

    if (AvatarChange.HAIR === change) {
      newAccountDetails.avatarHair = (choicesList as Hairs[])[newIndex];
    }
    if (AvatarChange.EYES === change) {
      newAccountDetails.avatarEyes = (choicesList as Eyes[])[newIndex];
    }
    this.print(newAccountDetails);
    this.details = newAccountDetails;

    this.changeEvent.emit(this.details);
  }

  print(avatar: AvatarDetails) {
    this.avatarService.printAvatarToKey(
      this.avatarService.createAvatarFromAvatarDetails(avatar),
      this.AVATAR_KEY,
      true
    );
  }
}
export enum AvatarChange {
  HAIR,
  EYES,
}
export enum Direction {
  LEFT,
  RIGHT,
}
