import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

export class BaseService {
  // Base Endpoint
  dev = 'http://localhost:8080/api/v1'
  prod = 'http://localhost:8080/api/v1'

  token = localStorage.getItem('accessToken')
  // Students Endpoint
  basePath = this.dev || this.prod;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.token}`
    })
  };

  constructor(protected http: HttpClient) {
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return observable with Error Message to Client
    return throwError(() =>
      new Error('Something happened with request, please try again later'));
  }
}
