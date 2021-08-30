import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { User } from 'src/app/modules/user';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showForm:boolean = false;

  @ViewChild('userForm') userForm:NgForm
users:User[] = []
single: User[];
  constructor(private Post: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    this.feathUser()
  }


  addForm() {
    this.showForm = true
  }


  //add user

  onAddUser(userData:User) {
    console.log(userData)
   this.users.push(userData)
   this.Post.onSaveData(userData).subscribe(
     res => console.log(res)
   )
   this.showForm = false
  }

//fetch user means data gets

feathUser() {
this.Post.fetchData().subscribe(res => {
  const data = JSON.stringify(res)
  JSON.parse(data)
  console.log(data)
  this.users = res
})
}





onDeleteData(userId) {
  this.Post.onDeleteData(userId).subscribe(() => {
    this.feathUser()
  })
}

}


