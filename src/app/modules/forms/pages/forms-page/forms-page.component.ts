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
import { EMPTY, Observable, map } from 'rxjs';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss'],
})
export class FormsPageComponent implements OnInit {
  formReport: FormGroup = new FormGroup({});
  users: Array<IUser> = [];

  usersResponsible: Observable<Array<IUser>> = EMPTY;
  concepts: Array<IConcept> = [];
  filteredConcepts: Array<IConcept> = [];

  areas: Array<IArea> = [];
  filteredAreas: Array<IArea> = [];

  filteredAuditors: Array<IUser> = [];
  filteredResponsible: Array<IUser> = [];

  activities = ACTIVITIES;
  auditStatus = AUDIT_STATUS;
  role = Role;
  submitted = false;

  constructor(
    private _reportService: ReportService,
    private _userService: UserService,
    private _areaService: AreaService,
    private _conceptService: ConceptService,
    private _messageService: MessageService
  ) {}

  get f() {
    return this.formReport.controls;
  }

  ngOnInit(): void {
    this._userService.get().subscribe((item) => {
      this.users = item;
      this.filteredAuditors = item;
      this.filteredResponsible = item;
    });
    this._areaService.get().subscribe((item) => {
      this.areas = item;
      this.filteredAreas = item;
    });
    this._conceptService.get().subscribe((item) => {
      this.concepts = item;
      this.filteredConcepts = item;
    });

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
    this.submitted = true;
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

  filterAuditor(event: any) {
    this.filteredAuditors = this.filters(event, this.users, 'fullName');
  }

  filterArea(event: any) {
    this.filteredAreas = this.filters(event, this.areas, 'name');
  }

  filterResponsible(event: any) {
    this.filteredResponsible = this.filters(event, this.users, 'fullName');
  }

  filterConcept(event: any) {
    this.filteredConcepts = this.filters(event, this.concepts, 'name');
  }

  filters(event: any, listData: any[], nameFieldFilter: string) {
    {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < listData?.length; i++) {
        let item = listData[i];
        if (
          item[nameFieldFilter]?.toLowerCase()?.indexOf(query?.toLowerCase()) ==
          0
        ) {
          filtered.push(item);
        }
      }
      return filtered;
    }
  }
}
