import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: '<%= selector %>',
  templateUrl: '<%= dashedModuleName %>.component.html',
  styleUrls: ['<%= dashedModuleName %>.component.css']
})
export class <%= moduleName %>Component implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
