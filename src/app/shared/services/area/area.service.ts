import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { IArea } from '@shared/models';
import { APIData } from '../api-data';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends APIData<IArea> {
  private _paths = environment.endpoints.paths;

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.path = this._paths.area;
  }

  override get(): Observable<Array<IArea>> {
    return of([
      {
        id: 1,
        name: 'Erick Nieto',
      },
    ]);
    //super.get();
  }
}
