import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface SidebarItem {
  moduleID: number;
  moduleName: string;
  route?: string;
  children?: SidebarItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private dataUrl = 'data/sidebar-menu.json';
  private menuData$!: Observable<SidebarItem[]>;

  constructor(private http: HttpClient) {
    // initialize here
    this.menuData$ = this.http
      .get<SidebarItem[]>(this.dataUrl)
      .pipe(shareReplay(1));
  }

  getMenu(): Observable<SidebarItem[]> {
    return this.menuData$;
  }
}