import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Course } from 'src/app/modules/shared/models/course/course.interface';
import { DeleteResponse } from 'src/app/modules/shared/models/responses/deleteResponse.interface';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  apiUrl: string = 'https://www.apiexample.com/';

  constructor(
    private http: HttpClient
  ) { }

  // PETICION GET
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // PETICION POST
  postCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // PETICION PUT
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(this.apiUrl, course);
  }

  // PETICION DELETE
  deleteCourse(course: Course): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(this.apiUrl, { body: course });
  }

  // PETICION CON REQUEST PARAMS
  getCoursesParams(): Observable<Course[]> {
    let api: string = 'https://angular-http-guide.firebaseio.com/courses.json';
    const params = new HttpParams()
      .set('orderBy', '"$key"')
      .set('limitToFirst', "1");
    return this.http.get<Course[]>(api, { params });
  }

  // PETICION CON HEADERS PERSONALIZADOS
  getCoursesWithHeaders(): Observable<Course[]> {
    const customHeaders: HttpHeaders = new HttpHeaders();
    customHeaders.set("Authorization","Bearer: eyJhbG.eyJzd.SflKxwRJSMeKKF2QT4");
    return this.http.get<Course[]>(this.apiUrl, {headers: customHeaders});
  }

  // HANDLER DE ERRORES
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Segundo tipo de Error
      console.error('Un error ha ocurrido:', error.error);
    } else {
      // Primer tipo de Error
      // Respuesta del servidor 404 o 500
      console.error(`Servidor emitio un codigo ${error.status}, y la respuesta es: `, error.error);
    }
    // Devuelve un observable con un mensaje de error de cara al usuario.
    return throwError(() => new Error('Algo malo sucedio - Inténtelo de nuevo más tarde.'));
  }

  // PETICION CON MANEJO DE ERRORES 
  getCourserWithErrorHandler(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl)
      .pipe(
        retry(3), // reintentar una solicitud fallida hasta 3 veces
        catchError(this.handleError)
      );
  }

  //PETICION CON PROMESAS
  getCoursesWithPromises() {
    const promise = new Promise<Course[]>((resolve, reject) => {
      return this.http.get<Course[]>(this.apiUrl).subscribe({
        next: response => {
          resolve(response)
        },
        error: error => {
          reject(error)
        }
      });
    })
    return promise;
  }

}
