import { Component, OnInit } from '@angular/core';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { GenericFieldComponent } from '../../shared/components/fields/generic-field/generic-field.component';
import { TableViewComponent } from '../../shared/components/table/table-view/table-view.component';
import { EndpointsService } from '../../shared/services/endpoints.service';
import { ITableColumn, productTableColumnsMock } from '../../shared/types/ITable.model';
import { IProduct } from '../../shared/types/IProduct.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [GenericFieldComponent, GenericButtonComponent, TableViewComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public productTableColumns: ITableColumn[] = productTableColumnsMock;
  public products: IProduct[] = [];
  public filteredProducts: IProduct[] = [];

  public formField: FormControl = new FormControl('');

  constructor(
    private _endpoints: EndpointsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this.formField.valueChanges.subscribe({
      next: () => {
        this.onFieldChange();
      }
    });
  }

  private _getProducts(): void {
    this._endpoints.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = this.products
      },
      error: (error) => {
        console.log('prod error', error);
      }
    });
  }
  
  public onFieldChange(): void {
    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.formField.value.toLowerCase());
    });
  }

  public onButtonClick(): void {
    console.log('button clicked');
    this._router.navigateByUrl('/create');
  }
}
