import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isLogging = false;
user;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.user.subscribe(res => {
      console.log(res);
      this.isLogging = !!res
    });
    this.authservice.profileInfo.subscribe(res => {
      this.user = res
    })
  }


  SignOut() {
    this.authservice.signOut();
  }

}
