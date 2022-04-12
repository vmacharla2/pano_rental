import { Component, OnInit,Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isAuth= false;
  @Output() closeSidenav = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  onCloseSidenav(): void {
    this.closeSidenav.emit();
  }

}
