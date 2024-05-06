import { Component } from '@angular/core';
import { FormConfig } from '../../shared/types/IFormConfig.model';
import { FormService } from '../../shared/services/form.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFieldComponent } from '../../shared/components/fields/generic-field/generic-field.component';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointsService } from '../../shared/services/endpoints.service';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ CommonModule, GenericFieldComponent, GenericButtonComponent, ReactiveFormsModule, FormsModule ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  public formConfig: FormConfig;
  public form: FormGroup;
  private _isEdit: boolean = false;

  constructor( private _formService: FormService, private _router: Router, private _activatedRoute: ActivatedRoute, private _endpoints: EndpointsService, private _productService: ProductsService ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    const id = this._activatedRoute.snapshot.params['id'];
    this._isEdit = Boolean(id);
    this._productService.createProductFormConfig(id).then((formConfig) => {
      this.formConfig = formConfig;
      
      this.form = this._formService.createForm(this.formConfig);
      console.log('formulario', this.form);
  
      this.form.get('dateRelease')?.valueChanges.subscribe( value => {
        this.form.get('dateRevision')?.setValue(this._productService.getDateInOneYear(new Date(value)));
        console.log('form value', this.form.get('dateRevision')?.value);
      });
    })
  }

  public getFormControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  public cancelForm() {
    this._router.navigateByUrl('/');
  }

  public submitForm() {
    const formValue = this._productService.getProductFromFormControls(this.form);
    if (this._isEdit) {
      this._endpoints.updateProduct(formValue).subscribe({
        next: res => {
          console.log(res);
          this._router.navigateByUrl('/');
        }
      })
    } else {
      this._endpoints.createProduct(formValue).subscribe({
        next: res => {
          console.log(res);
          this._router.navigateByUrl('/');
        }
      })
    }
  }
}
