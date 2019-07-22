import { State, Action, StateContext } from '@ngxs/store';
import { TreeAction } from './tree.actions';
import * as uuid from 'uuid';

export class TreeNode {
  public uuid: string;
  public name: string;
  public children?: TreeNode[];
}

export type TreeStateModel = TreeNode[];

@State<TreeStateModel>({
  name: 'tree',
  defaults: [
    {
      uuid: uuid.v4(),
      name: 'Character',
      children: [
        { uuid: uuid.v4(), name: 'nanoha' },
        { uuid: uuid.v4(), name: 'fate' },
        { uuid: uuid.v4(), name: 'hayate' }
      ]
    }
  ]
})
export class TreeState {}
