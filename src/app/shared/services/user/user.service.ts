import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { IUser } from '@shared/models';
import { APIData } from '../api-data';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserService extends APIData<IUser> {
  private _paths = environment.endpoints.paths;

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.path = this._paths.user;
  }

  override get(): Observable<Array<IUser>> {
    return of([
      {
        id: 1,
        username: 'Erick1',
        password: '12345',
        email: 'erick@gmail.com',
        role: 'AUDITOR',
        status: 'ACTIVE',
        firstName: 'erick',
        lastName: 'nieto',
        fullName: 'erick nieto',
      },
      {
        id: 2,
        username: 'Juan1',
        password: '12345',
        email: 'erick@gmail.com',
        role: 'AUDITOR',
        status: 'ACTIVE',
        firstName: 'Juan',
        lastName: 'nieto',
        fullName: 'Juan nieto',
      },
      {
        id: 2,
        username: 'Juan1',
        password: '12345',
        email: 'erick@gmail.com',
        role: 'RESPONSIBLE',
        status: 'ACTIVE',
        firstName: 'Juan',
        lastName: 'nieto',
        fullName: 'Juan nieto',
      },
    ]); //super.get();
  }

  override getById(id: number): Observable<IUser> {
    return this.getById(id);
  }

  override post(body: IUser): Observable<IUser> {
    return super.post(body);
  }

  override put(body: IUser, id: number): Observable<IUser> {
    return super.put(body, id);
  }

  override delete(id: number): Observable<any> {
    return super.delete(id);
  }
}
