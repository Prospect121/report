import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { IConcept } from '@shared/models';
import { APIData } from '../api-data';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConceptService extends APIData<IConcept> {
  private _paths = environment.endpoints.paths;

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.path = this._paths.concept;
  }

  override get(): Observable<Array<IConcept>> {
    return of([
      {
        id: 1,
        name: 'concepto uno',
      },
      {
        id: 2,
        name: 'erick',
      },
    ]); //super.get();
  }
}
