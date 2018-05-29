import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuthenticated = false;
  authenticationSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.authenticationChange.subscribe(authenticationStatus => {
      this.isAuthenticated = authenticationStatus;
    });
  }

  ngOnDestroy() {
    this.authenticationService.authenticationChange.unsubscribe();
  }

  onClickNavListItem() {
    this.closeSidenav.emit();
  }

  onClickLogout(): boolean {
    this.onClickNavListItem();
    return this.authenticationService.logout();
  }

}
