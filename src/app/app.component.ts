import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { TreeState, TreeStateModel, TreeNode } from 'state/tree.state';
import { Observable } from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  @Select(TreeState) tree$: Observable<TreeStateModel>;
  nestedTreeControl: NestedTreeControl<TreeNode>;
  nestedDataSource: MatTreeNestedDataSource<TreeNode>;

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<TreeNode>(this.getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  public ngOnInit() {
    this.tree$.subscribe(tree => {
      this.nestedDataSource.data = null; // Note: This fixes tree not updated problem.
      this.nestedDataSource.data = tree;
      this.nestedTreeControl.dataNodes = tree;
    });
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
}
