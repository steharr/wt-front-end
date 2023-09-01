export interface AvatarOptions {
  hairChoices: Hairs[];
  eyeChoices: Eyes[];
}

export type Hairs =
  | 'balndess'
  | 'slaughter'
  | 'ponyTail'
  | 'long'
  | 'curly'
  | 'stylish'
  | 'elvis'
  | 'classic02'
  | 'classic01';
export type Eyes = 'normal' | 'confident' | 'happy';
