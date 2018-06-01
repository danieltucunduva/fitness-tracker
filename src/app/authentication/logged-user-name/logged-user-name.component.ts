import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logged-user-name',
  templateUrl: './logged-user-name.component.html',
  styleUrls: ['./logged-user-name.component.css']
})
export class LoggedUserNameComponent implements OnInit {
  userName: string;


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userName = this.authenticationService.getUserName();
  }

  getUserName(): string {
    return this.userName ? this.userName : '?';
  }

}
