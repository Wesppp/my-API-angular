import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ISubject } from "../interfaces/subjects";
import {catchError, Observable, of} from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ISubject[]> {
     return this.http.get<ISubject[]>(this.apiUrl).pipe(
       catchError(this.handleError<ISubject[]>("get subjects"))
     )
  }

  getUser(id: number): Observable<ISubject> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ISubject>(url).pipe(
      catchError(this.handleError<ISubject>("get user"))
    )
  }

  postUser(user: ISubject): Observable<ISubject> {
    return this.http.post<ISubject>(this.apiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<ISubject>("post subject"))
    )
  }

  deleteUser(id: number): Observable<ISubject> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ISubject>(url, this.httpOptions).pipe(
      catchError(this.handleError<ISubject>("delete subject"))
    )
  }

  putUser(user: ISubject): Observable<any> {
    const url = `${this.apiUrl}`
    return this.http.put(url, user, this.httpOptions).pipe(
      catchError(this.handleError<ISubject>("put subject"))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({ "Accept": "application/json", "Content-Type": "application/json" })
  };

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      console.log(`${operation} failed: ${error.message}`)

      return of(result as T);
    }
  }
}
