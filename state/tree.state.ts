import { State, Action, StateContext } from '@ngxs/store';
import { AddTree } from './tree.actions';
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
        { uuid: uuid.v4(), name: 'Nanoha' },
        { uuid: uuid.v4(), name: 'Fate' },
        { uuid: uuid.v4(), name: 'Hayate' }
      ]
    }
  ]
})
export class TreeState {
  @Action(AddTree)
  AddTree(ctx: StateContext<TreeStateModel>) {
    const tree = ctx.getState();
    ctx.setState([
      {
        uuid: uuid.v4(),
        name: 'Device',
        children: [
          { uuid: uuid.v4(), name: 'Raising Heart' },
          { uuid: uuid.v4(), name: 'Bardiche' },
          { uuid: uuid.v4(), name: 'Reinforce' }
        ]
      },
      ...tree.map(node => ({ ...node }))
    ]);
  }
}
