import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Form: FormGroup
  editMode:boolean = false
profileInfo;
  token = JSON.parse(localStorage.getItem('userData'))._token;

  constructor(private router: Router, private fb: FormBuilder , private route: ActivatedRoute, private authService: AuthService) { 
    this.authService.profileInfo.subscribe(res => {
      this.profileInfo = res
    })
  }

  ngOnInit(): void {
   this.Form = this.fb.group({
     name: ['Edit name'],
     picture: ['Edit Photo']
   })
   this.route.queryParamMap.subscribe(res => {
     let qParms = res.get('EditMode');

     if(qParms !=null) {
       this.editMode = true
     }else {
       this.editMode = false
     }

   })
   this.authService.profileInfo.subscribe(res => {
     this.profileInfo = res;
     this.Form.setValue({
       name: res.displayName,
       picture: res.photoUrl
     })
   })
  // console.log(this.token)
  }


  onEmpSubmit() {
    if(this.Form.valid) {
      //console.log(this.Form.value
      const uData = {token: this.token, ...this.Form.value};
      this.authService.updateProfile(uData).subscribe(
        (res) => {
          console.log(res);
          this.authService.getData(this.token)
        },
        (err) => console.log(err)
      )
      
    }
  }


  onDiscard() {
    this.Form.reset();
    this.router.navigate([], {queryParams: {EditMode: null}})
  }

}
