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
  subject: ISubject = {name: '', id: ''}
  subjects: ISubject[] = []

  constructor(private apiService: ApiService) {
  }

  getSubjects() {
    this.apiService.getUsers()
      .subscribe(subjects =>  {
        if (subjects.length) {
          this.subjects = subjects
          this.apiService.openSnackBar('Предметы получены')
        }
      }, error => console.log(error.message))
  }

  getSubject(id: string) {
    this.apiService.getUser(id)
      .subscribe(subject => {
        if (subject) {
          this.subjects = []
          this.subjects[0] = subject
          this.apiService.openSnackBar('Предмет получен')
        }
      }, error => console.log(error.message))
  }

  addSubject(name: string) {
    this.apiService.postUser({name} as ISubject)
      .subscribe(subject => {
        if (subject) {
          this.apiService.openSnackBar('Предмет добавлен')
        }
      }, error => console.log(error.message))
  }

  deleteSubject(id: string) {
    this.apiService.deleteUser(id)
      .subscribe(subject => {
        if (subject) {
          this.apiService.openSnackBar('Предмет удалён')
        }
      }, error => console.log(error.message))
  }

  putSubject(name: string, id: string) {
    this.apiService.putUser({name, id} as ISubject)
      .subscribe(subject => {
        if (subject)
        this.apiService.openSnackBar('Предмет обновлён')
      }, error => console.log(error.message))
  }
}
