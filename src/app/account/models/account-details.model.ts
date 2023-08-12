export interface AccountDetails {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  username: string;
  password: string;
  email: string;
  avatarHair:
    | 'balndess'
    | 'slaughter'
    | 'ponyTail'
    | 'long'
    | 'curly'
    | 'stylish'
    | 'elvis'
    | 'classic02'
    | 'classic01';
  avatarEyes: 'normal' | 'confident' | 'happy';
}
