import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');
    let headers = request.headers;

    if (jwtToken) {
      // Add Authorization header if JWT token exists
      headers = headers.set('Authorization', `Bearer ${jwtToken}`);
    }

    // Check if the request needs 'multipart/form-data' Content-Type header
    // if (request.body instanceof FormData) {
    //   headers = headers.set('Content-Type', 'multipart/form-data');
    // }

    // Clone the request with the updated headers
    request = request.clone({ headers });
    // console.log('HTTP Headers:', headers);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigateByUrl('');
        }
        return throwError(error);
      })
    );
  }
}
