import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  currentlyOpenPanel: NavItem | undefined;
  constructor(public navService: NavService) {}

  ngOnInit(): void {}
  togglePanel(item: NavItem): void {
    if (this.currentlyOpenPanel === item) {
      this.currentlyOpenPanel = undefined; // Close the panel if it's already open
    } else {
      this.currentlyOpenPanel = item; // Otherwise, open the panel
    }
  }

  isPanelOpen(item: NavItem): boolean {
    return this.currentlyOpenPanel === item;
  }
}
