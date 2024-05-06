import { Injectable } from '@angular/core';
import { IProduct } from '../types/IProduct.model';
import { IFormConfig } from '../types/IFormConfig.model';
import { EndpointsService } from './endpoints.service';
import { firstValueFrom } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';
import { AlertService } from './alert.service';
import { AlertTypes } from '../types/IAlert.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _endpoints: EndpointsService, private _alert: AlertService) { }

  public async getProductById(productId: string): Promise<IProduct | undefined> {
    try {
      return await firstValueFrom(this._endpoints.getProductById(productId));
  } catch (error) {
      this._alert.showAlert({
        type: AlertTypes.Danger,
        message: 'Ocurrió un error al obtener el producto a editar.'
      })
      console.error('Failed to fetch product', error);
      return undefined;
  }
  }

  public async createProductFormConfig(id?: string): Promise<IFormConfig> {
    const product: IProduct | undefined = id ? await this.getProductById(id) : undefined;

    const formConfig: IFormConfig = {
      fields: [
        {
          key: 'id',
          label: 'Id',
          type: 'text',
          value: product?.id || '',
          isDisabled: Boolean(product),
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
          value: product?.name || '',
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
          value: product?.description || '',
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
          value: product?.logo || '',
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
          value: product?.dateRelease ? new Date(product?.dateRelease).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10),
          isDisabled: false,
          validations: {
            required: true,
            minDate: Boolean(product) ? product?.dateRelease : new Date()
          },
          asyncValidations: {}
        },
        {
          key: 'dateRevision',
          label: 'Fecha de Revisión',
          type: 'date',
          value: product?.dateRevision ? new Date(product.dateRevision).toISOString().substring(0, 10) : this.getDateInOneYear(),
          isDisabled: true,
          validations: {
            required: true
          },
          asyncValidations: {}
        }
      ]
    };

    return formConfig;
  }

  public getDateInOneYear(value: Date = new Date()): string {
    let newValue = value;
    newValue.setFullYear(value.getFullYear() + 1);
    return newValue.toISOString().substring(0,10);
  }

  public getProductFromFormControls(formValue: AbstractControl): IProduct {
    return {
      id: formValue.get('id')?.value,
      name: formValue.get('name')?.value,
      description: formValue.get('description')?.value,
      logo: formValue.get('logo')?.value,
      dateRelease: formValue.get('dateRelease')?.value,
      dateRevision: formValue.get('dateRevision')?.value
    }
  }
}
