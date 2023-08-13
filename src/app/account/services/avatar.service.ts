import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { miniavs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../models/account-details.model';
import { AvatarOptions } from '../models/avatar-options.model';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private url: string = environment.url + '/account/';
  hairColors = ['1b0b47', '47280b', 'ad3a20'];
  skinColors = ['836055', 'f5d0c5', 'ffcb7e'];
  constructor(private http: HttpClient) {}

  createAvatar(details: AccountDetails): Document {
    const avatar = createAvatar(miniavs, {
      hair: [details.avatarHair],
      eyes: [details.avatarEyes],
      backgroundType: ['gradientLinear'],
      backgroundColor: ['b6e3f4'],
      backgroundRotation: [0, 180],
      body: ['tShirt'],
      // hairColor: ['1b0b47', '47280b', 'ad3a20'],
      // hairColor: ['1b0b47', '47280b', 'ad3a20'],
    });
    var parser = new DOMParser();
    return parser.parseFromString(avatar.toString(), 'image/svg+xml');
  }

  options(): Observable<AvatarOptions> {
    return this.http.get<AvatarOptions>(this.url + 'avatar-options');
  }
}
