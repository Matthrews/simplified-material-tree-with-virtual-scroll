import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, ViewChild, AfterViewInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling'

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type?: string;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) {}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
  const something = [
    {
      filename: 'Applications (1)',
      children: [
        { filename: 'Calendar',type: 'app' },
        { filename: 'Chrome', type: 'app' },
        { filename: 'Webstorm', type: 'app'},
      ],
    },
    {
      filename: 'Documents (2)',
      children: [
        {
          filename: 'angular',
          children: [
            {
              filename: 'src', 
              children: [
                { filename: 'compiler',type: 'ts' },
                { filename: 'core', type: 'ts' },
              ],
            },
          ],
        }, {
          filename: 'material2 (3)',
          children: [
            {
              filename: 'src',
              children: [
                { filename: 'button',type: 'ts' },
                { filename: 'checkbox', type: 'ts' },
                { filename: 'input',type: 'ts' },
              ],
            },
          ],
        },
      ],
    },
    {
      filename: 'Downloads (4)',
      children: [
        { filename: 'October', type: 'pdf' },
        { filename: 'November', type: 'pdf' },
        { filename: 'Tutorial', type: 'html' },
      ],
    },
    {
      filename: 'Pictures (5)',
      children: [
        {
          filename: 'Photo Booth Library',
          children: [
            { filename: 'Contents', type: 'dir' },
            { filename: 'Pictures', type: 'dir' },
          ],
        },
        { filename: 'Sun', type: 'png' },
        { filename: 'Woods', type: 'jpg' },
      ],
    },
  ] as FileNode[];


/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample implements AfterViewInit {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  fullDatasource = [
      ...something, ...something, ...something,
      ...something, ...something, ...something,
      ...something, ...something, ...something,
      ].map((item, index)=>{return {...item, filename: 'this is item '+index}})
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport; 

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.fullDatasource.slice(0, 10);
  }

  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  }

  private _getLevel = (node: FileFlatNode) => node.level;

  private _isExpandable = (node: FileFlatNode) => node.expandable;

  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  ngAfterViewInit() {
    this.virtualScroll.renderedRangeStream.subscribe(range => {
      console.log(range, 'range')
      this.dataSource.data = this.fullDatasource.slice(range.start, range.end)
    })
  }
}
