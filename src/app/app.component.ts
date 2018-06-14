import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';
import { trigger, state, style, transition, animate, keyframes, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('home => sprint', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ]),
      transition('sprint => home', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.handleLoginCallback();
  }

  getActivatedRouteState(routerOutletRef) {
    return routerOutletRef.activatedRouteData.state;
  }

}
