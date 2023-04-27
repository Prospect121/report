import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export class APIData<T> {
  protected host: string;
  protected path: string;
  protected http: HttpClient;

  protected get url(): string {
    return `${environment.api}${this.path}`;
  }

  constructor(http: HttpClient, protected messageService: MessageService) {
    this.http = http;
    this.host = environment.api;
    this.path = '';
  }

  protected get(): Observable<Array<T>> {
    return this.http.get<T>(this.url).pipe(
      catchError((error) => {
        this._msjError(error?.error?.error);
        return of(error);
      })
    );
  }

  protected getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`).pipe(
      catchError((error) => {
        this._msjError(error?.error?.error);
        return of(error);
      })
    );
  }

  protected post(body: T): Observable<T> {
    return this.http.post<T>(this.url, body).pipe(
      catchError((error) => {
        console.log(error);
        this._msjError(error?.error?.error);
        return of(error);
      })
    );
  }

  protected put(body: T, id: number): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, body).pipe(
      catchError((error) => {
        this._msjError(error?.error?.error);
        return of(error);
      })
    );
  }

  protected delete(id: number): Observable<T> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((error) => {
        this._msjError(error?.error?.error);
        return of(error);
      })
    );
  }

  private _msjError(msjBack: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Ha ocurrido un error',
      detail: msjBack,
    });
  }
}
