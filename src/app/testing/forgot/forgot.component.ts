import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  Form: FormGroup;
  error:any;
  success: boolean = false

  constructor(private fb:FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }


  onSubmit() {
    console.log(this.Form.value);

    if(this.Form.valid) {
      this.auth.forgotPassword(this.Form.value).subscribe(res => {
        console.log(res)
        this.success = true
      },
      (err)=> {
        this.error = err;
        console.log(err)
      })
    }
  }

}
