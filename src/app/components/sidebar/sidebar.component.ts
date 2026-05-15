import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

import { SidebarService, SidebarItem } from '../../shared/services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
        display: 'none'
      })),
      state('visible', style({
        height: '*',
        opacity: '1',
        display: 'block'
      })),
      transition('hidden => visible', [
        style({ display: 'block' }),
        animate('200ms ease-out', style({ height: '*', opacity: '1' }))
      ]),
      transition('visible => hidden', [
        animate('200ms ease-in', style({ height: '0', opacity: '0' })),
        style({ display: 'none' })
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menuItems: SidebarItem[] = [];
  menuState = 'in';
  expanded: number = 0;
  isAnimated = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sidebarService.getMenu().subscribe(items => {
      this.menuItems = items;

      this.expandActiveParent();
    });
  }

  expandActiveParent(): void {
    for (const item of this.menuItems) {
      if (
        item.children?.some(sub =>
          this.router.url.includes(sub.route || '')
        )
      ) {
        this.expanded = item.moduleID;
      }
    }
  }

  toggleSubMenu(item: SidebarItem): void {
    this.expanded =
      this.expanded === item.moduleID ? 0 : item.moduleID;
  }

  navigateTo(route?: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }
}