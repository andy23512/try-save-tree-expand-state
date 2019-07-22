export class TreeAction {
  static readonly type = '[Tree] Add item';
  constructor(public payload: string) { }
}
