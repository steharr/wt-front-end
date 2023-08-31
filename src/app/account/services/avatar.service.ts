import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { miniavs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../models/account-details.model';
import { AvatarOptions } from '../models/avatar-options.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private userAvatar = new BehaviorSubject<Document | null>(null);
  userAvatar$ = this.userAvatar.asObservable();

  avatarUpdatedEvent = new EventEmitter<any>();

  private url: string = environment.url + '/account/';
  hairColors = ['1b0b47', '47280b', 'ad3a20'];
  skinColors = ['836055', 'f5d0c5', 'ffcb7e'];

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getAvatar(): Observable<Document> {
    return this.accountService
      .details()
      .pipe(map((details) => this.createAvatar(details)));
  }

  getAndPrintAvatarToKey(key: string) {
    this.getAvatar().subscribe({
      next: (avatar) => {
        this.printAvatarToKey(avatar, key);
      },
    });
  }

  printAvatarToKey(avatar: Document, key: string, replace = false) {
    const ref = document.getElementById(key);
    if (ref) {
      if (replace) {
        ref.innerHTML = '';
      }

      ref.appendChild(avatar.documentElement);
    }
  }

  createAvatar(details: AccountDetails): Document {
    const avatar = createAvatar(miniavs, {
      hair: [details.avatarHair],
      eyes: [details.avatarEyes],
      backgroundType: ['gradientLinear'],
      backgroundColor: ['b6e3f4'],
      backgroundRotation: [0, 180],
      body: ['tShirt'],
    });
    var parser = new DOMParser();
    const result = parser.parseFromString(avatar.toString(), 'image/svg+xml');
    return result;
  }

  updateUserAvatar(avatar: Document) {
    this.userAvatar.next(avatar);
  }

  options(): Observable<AvatarOptions> {
    return this.http.get<AvatarOptions>(this.url + 'avatar-options');
  }
}
