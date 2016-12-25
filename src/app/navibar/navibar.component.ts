import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})

export class NavibarComponent implements OnInit {

  title = 'deine Mudda!';

  constructor() { }

  ngOnInit() {
  }
}
