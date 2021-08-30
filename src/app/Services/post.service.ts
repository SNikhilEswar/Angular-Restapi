import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modules/user';
import {map} from 'rxjs/operators'
import { Config } from '../modules/config';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  api = Config.API_URL;

  url = this.api + '/employee.json';
  constructor(private http: HttpClient) { }
  user:User

  onSaveData(Employee: User) {
   return this.http.post<User>(this.url, Employee)
  }


  fetchData() {
    return this.http.get<User>(this.url).pipe(
      map((resData) => {
        //console.log(resData);
        const userArray = [];
        for(const key in resData) {
          if(resData.hasOwnProperty(key)) {
            userArray.push({userId:key, ...resData[key]})
          }
        }
        return userArray
      })
    )
  }


  fetchData2() {
    return this.http.get<User>(this.url).pipe(
      map((resData) => {
        //console.log(resData);
        const userArray = [];
        for(const key in resData) {
          if(resData.hasOwnProperty(key)) {
            userArray.push({id:key, ...resData[key]})
          }
        }
        return userArray
      })
    )
  }


  onFetchSingle(id:string) {
   return this.http.get<User>('https://json-data-43237-default-rtdb.firebaseio.com/employee/'+id+'.json')

  }

  
onDeleteData(userId ) {
  if(confirm('do you want to delete')) {
    console.log(userId);
   return this.http.delete(`${this.api}/employee/${userId}.json`)

  //  ('https://json-data-43237-default-rtdb.firebaseio.com/employee/'+userId+'.json')
}
}


}
