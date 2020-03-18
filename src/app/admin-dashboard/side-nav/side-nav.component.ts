import { Component, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnInit {
  public navSecHeaderIcon = faChevronDown

  public orgLinksShown: boolean = false
  public securityLinksShown: boolean = false
  
  constructor() { }

  ngOnInit(): void {
  }

}
