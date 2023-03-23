import './polyfills';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {ScrollDispatchModule} from '@angular/cdk/scrolling'
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatTreeModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TreeFlatOverviewExample} from './app/tree-flat-overview-example';

@NgModule({
  exports: [
    CdkTableModule,
    CdkTreeModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    ScrollDispatchModule,
  ]
})
export class DemoMaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [TreeFlatOverviewExample],
  declarations: [TreeFlatOverviewExample],
  bootstrap: [TreeFlatOverviewExample],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */