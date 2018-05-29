import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated = false;
  authenticationSubscription: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.authenticationChange.subscribe(authenticationStatus => {
      this.isAuthenticated = authenticationStatus;
    });
  }

  ngOnDestroy(): void {
    this.authenticationSubscription.unsubscribe();
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onClickLogout(): boolean {
    return this.authenticationService.logout();
  }

}
