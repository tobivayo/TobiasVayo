import { Component } from '@angular/core';
import { FormConfig } from '../../shared/types/IFormConfig';
import { FormService } from '../../shared/services/form.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFieldComponent } from '../../shared/components/fields/generic-field/generic-field.component';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EndpointsService } from '../../shared/services/endpoints.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ CommonModule, GenericFieldComponent, GenericButtonComponent, ReactiveFormsModule, FormsModule ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  public formConfig: FormConfig = {
    fields: [
      {
        key: 'id',
        label: 'Id',
        type: 'text',
        value: '',
        isDisabled: false,
        validations: {
          required: true,
          minlength: 3,
          maxlength: 10
        },
        asyncValidations: {
          uniqueId: true
        }
      },
      {
        key: 'name',
        label: 'Nombre',
        type: 'text',
        value: '',
        isDisabled: false,
        validations: {
          required: true,
          minlength: 5,
          maxlength: 100
        },
        asyncValidations: {}
      },
      {
        key: 'description',
        label: 'Descripción',
        type: 'text',
        value: '',
        isDisabled: false,
        validations: {
          required: true,
          minlength: 10,
          maxlength: 200
        },
        asyncValidations: {}
      },
      {
        key: 'logo',
        label: 'Logo',
        type: 'text',
        value: '',
        isDisabled: false,
        validations: {
          required: true
        },
        asyncValidations: {}
      },
      {
        key: 'dateRelease',
        label: 'Fecha de Liberación',
        type: 'date',
        value: new Date().toISOString().substring(0, 10),
        isDisabled: false,
        validations: {
          required: true,
          minDate: new Date()
        },
        asyncValidations: {}
      },
      {
        key: 'dateRevision',
        label: 'Fecha de Revisión',
        type: 'date',
        value: this._getDateInOneYear(),
        isDisabled: true,
        validations: {
          required: true,
          minDate: new Date()
        },
        asyncValidations: {}
      }
    ]
  };

  public form: FormGroup;

  constructor( private _formService: FormService, private _router: Router, private _endpoints: EndpointsService ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this._formService.createForm(this.formConfig);

    this.form.get('dateRelease')?.valueChanges.subscribe( value => {
      this.form.get('dateRevision')?.setValue(this._getDateInOneYear(new Date(value)));
    });
  }

  private _getDateInOneYear(value: Date = new Date()): string {
    let newValue = value;
    newValue.setFullYear(value.getFullYear() + 1);
    return newValue.toISOString().substring(0,10);
  }

  public getFormControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  public cancelForm() {
    this._router.navigateByUrl('/');
  }

  public submitForm() {
    console.log('form submitted', this.form.value);
    this._endpoints.createProduct(this.form.value).subscribe({
      next: res => {
        console.log(res);
        this._router.navigateByUrl('/');
      }
    })
  }
}
