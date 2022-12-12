import { Injectable } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav!: MatSidenav;
  private drawer!: MatDrawer;

  constructor() { }

  public setSidenav(sidenav: MatSidenav){
    this.sidenav = sidenav;
  }

  public setDrawer(drawer: MatDrawer){
    this.drawer = drawer;
  }

  public dToggle(){
    this.drawer.toggle();
  }

  public toggle(){
    this.sidenav.toggle();
  }
}
