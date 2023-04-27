import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IReport } from '@shared/models';
import { APIData } from '../api-data';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ReportService extends APIData<IReport> {
  private _paths = environment.endpoints.paths;

  constructor(
    protected override http: HttpClient,
    protected override messageService: MessageService
  ) {
    super(http, messageService);
    this.path = this._paths.report;
  }

  override get(): Observable<Array<IReport>> {
    return super.get();
  }

  override post(body: IReport): Observable<IReport> {
    return super.post(body);
  }
}
