import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TreeState, TreeStateModel, TreeNode } from 'state/tree.state';
import { Observable } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { AddTree } from 'state/tree.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @Select(TreeState) tree$: Observable<TreeStateModel>;
  nestedTreeControl: NestedTreeControl<TreeNode>;
  nestedDataSource: MatTreeNestedDataSource<TreeNode>;

  constructor(private store: Store) {
    this.nestedTreeControl = new NestedTreeControl<TreeNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  public ngOnInit() {
    this.tree$.subscribe(tree => {
      this.nestedDataSource.data = null; // Note: This fixes tree not updated problem.
      this.nestedDataSource.data = tree;
      this.nestedTreeControl.dataNodes = tree;
      this.updateExpansionModel();
    });
    this.nestedTreeControl.expansionModel.changed.subscribe(console.log);
  }

  public hasNestedChild(_: number, node: TreeNode): boolean {
    return !!node.children;
  }

  public getNodeUuid(_: number, node: TreeNode): string {
    return node.uuid;
  }

  public getChildren(node: TreeNode): TreeNode[] {
    return node.children || null;
  }

  public addTree() {
    this.store.dispatch(new AddTree());
  }

  public updateExpansionModel() {
    const allNodes = this.nestedTreeControl.dataNodes.reduce<TreeNode[]>(
      (accumulator, dataNode) => [
        ...accumulator,
        ...this.nestedTreeControl.getDescendants(dataNode),
        dataNode
      ],
      []
    );
    const selected = this.nestedTreeControl.expansionModel.selected;
    const newSelected = selected
      .map(({ uuid }) => allNodes.find(node => node.uuid === uuid))
      .filter(node => typeof node !== 'undefined');
    this.nestedTreeControl.expansionModel.clear();
    this.nestedTreeControl.expansionModel.select(...newSelected);
  }
}
