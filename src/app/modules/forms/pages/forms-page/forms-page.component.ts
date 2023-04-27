import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ACTIVITIES, AUDIT_STATUS } from '@shared/const';
import { Role } from '@shared/enums';
import { IArea, IConcept, IReport, IUser } from '@shared/models';
import { AreaService } from '@shared/services/area/area.service';
import { ConceptService } from '@shared/services/concept/concept.service';
import { ReportService } from '@shared/services/report/report.service';
import { UserService } from '@shared/services/user/user.service';
import { MessageService } from 'primeng/api';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
})
export class FormsPageComponent implements OnInit {
  formReport: FormGroup = new FormGroup({});
  users: Observable<Array<IUser>> = EMPTY;
  usersResponsible: Observable<Array<IUser>> = EMPTY;
  areas: Observable<Array<IArea>> = EMPTY;
  concepts: Observable<Array<IConcept>> = EMPTY;
  activities = ACTIVITIES;
  auditStatus = AUDIT_STATUS;
  role = Role;

  constructor(
    private _reportService: ReportService,
    private _userService: UserService,
    private _areaService: AreaService,
    private _conceptService: ConceptService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.users = this._userService.get();
    this.areas = this._areaService.get();
    this.concepts = this._conceptService.get();

    this.formReport = new FormGroup({
      id: new FormControl(0),
      auditor: new FormControl(null, [Validators.required]),
      date: new FormControl(new Date(), [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      responsible: new FormControl(null, [Validators.required]),
      cdaCode: new FormControl('', [Validators.required]),
      pdvCode: new FormControl('', [Validators.required]),
      concept: new FormControl(null, [Validators.required]),
      improvement: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      activity: new FormControl(null, [Validators.required]),
      followUp: new FormControl('', [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
  }

  sendReport(): void {
    const value = this.formReport.value;
    const body: IReport = {
      id: value.id,
      auditor: value.auditor,
      date: value.date,
      identification: value.identification,
      area: value.area,
      responsible: value.responsible,
      cdaCode: value.cdaCode,
      pdvCode: value.pdvCode,
      concept: value.concept,
      improvement: value.improvement,
      value: value.value,
      activity: value.activity.name,
      followUp: value.followUp,
      status: value.status.name,
    };

    this._reportService.post(body).subscribe((item) => {
      if (item.status == '200') {
        this.formReport.reset();
        this.loadToast();
      }
    });
  }

  loadToast(
    status: 'warning' | 'success' = 'success',
    title: string = 'Éxito',
    msj: string = 'Datos guardados con éxito'
  ) {
    this._messageService.add({
      severity: status,
      summary: title,
      detail: msj,
    });
  }
}
