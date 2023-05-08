import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeDocument } from '@shared/enums/type-document';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  typeDocuments: { name: string; code: string }[] = [
    { name: 'Cédula', code: TypeDocument.cc },
    { name: 'Tarjeta de identidad', code: TypeDocument.ti },
  ];

  constructor(private readonly _formBuilder: FormBuilder) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      typeDocument: [null, [Validators.required]],
      numberDocument: [null, [Validators.required]],
      password: [null, Validators.required],
      confirm: [false, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    //const { email, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    //this._router.navigate(['/']);
  }
}
