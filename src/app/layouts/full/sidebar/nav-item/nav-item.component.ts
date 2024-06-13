import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { UserAuthService } from '../../../../services/Auth/user-auth-service.service'
@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;
  @Input() isPanelOpen: boolean = false;
  @Output() togglePanel: EventEmitter<void> = new EventEmitter<void>();
  constructor(public navService: NavService, public router: Router,public userAuthService: UserAuthService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
  shouldDisplay(item: NavItem): boolean {
    const userRole = this.userAuthService.getRole();
    // console.log(userRole)
    if (!userRole) {
      return false; // If user role is not available, hide the item
    }

    // Check if the user's role matches any of the roles specified for the item
    if (item.roles && item.roles.includes(userRole)) {
      return true; // Show the item if the user's role matches
    }

    // If the item has children, recursively check each child
    if (item.children && item.children.length > 0) {
      return item.children.some(child => this.shouldDisplay(child));
    }

    // If no match found and the item has no children, hide the item
    return false;
  }
}
