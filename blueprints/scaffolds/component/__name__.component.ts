import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  templateUrl: '<%= dashedModuleName %>.component.pug',
  styleUrls: ['<%= dashedModuleName %>.component.<%= styleExtension %>']
})
export class <%= moduleName %>Component implements OnInit {
  constructor() {}
  ngOnInit() {}
}
