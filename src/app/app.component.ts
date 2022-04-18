import { Component } from '@angular/core';
import {ISubject} from "./shared/interfaces/subjects";
import {ApiService} from "./shared/services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-API';
  subject: ISubject = {name: '', id: 0}
  subjects: ISubject[] = []

  constructor(private apiService: ApiService) {
  }

  getUsers() {
    this.apiService.getUsers()
      .subscribe(subjects =>  {
        if (subjects.length) {
          this.subjects = subjects
        }
      }, error => console.log(error.message))
  }

  getUser(id: number) {
    this.apiService.getUser(id)
      .subscribe(subject => {
        if (subject) {
          this.subjects = []
          this.subjects[0] = subject
        }
      }, error => console.log(error.message))
  }

  addUser(name: string) {
    this.apiService.postUser({name} as ISubject)
      .subscribe(subject => {
        if (subject) {
          console.log(subject)
        }
      }, error => console.log(error.message))
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id)
      .subscribe(subject => {
        if (subject) {
          console.log(subject)
        }
      }, error => console.log(error.message))
  }

  putUser(name: string, id: number) {
    this.apiService.putUser({name, id} as ISubject)
      .subscribe(smth => {
        console.log(smth)
      }, error => console.log(error.message))
  }
}
