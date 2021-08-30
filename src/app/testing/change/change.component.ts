import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {

  Form: FormGroup;
  token = JSON.parse(localStorage.getItem('userData'))._token;
  success: boolean = false;
  constructor(private auth:AuthService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }


  onSubmit() {
    console.log(this.Form.value);

    if(this.Form.valid) {
      const data = {token: this.token, ...this.Form.value};
      this.auth.changePassword(data).subscribe(res => {
        console.log(res);
        this.success = true
      })
    }

  }

}
