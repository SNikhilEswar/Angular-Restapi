import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {User} from 'src/app/modules/user'
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  id;
  item: User;
  constructor(private route: ActivatedRoute, private post: PostService) { }
  ngOnInit(): void {
  //  this.route.paramMap.subscribe(parms => {
  //    console.log(parms.get('id'))
  //    let pid = +parms.get('id')
  //    this.post.fetchData2().subscribe(res => {
  //      console.log(res)
  //      this.post.onFetchSingle(pid).subscribe(res => {
  //        this.users = res
  //        console.log(res)
  //      })
  //    })
  //  })
  
  }
  


}

