import { Component, OnInit } from '@angular/core';
import { GenericButtonComponent } from '../../shared/components/generic-button/generic-button.component';
import { GenericFieldComponent } from '../../shared/components/fields/generic-field/generic-field.component';
import { TableViewComponent } from '../../shared/components/table/table-view/table-view.component';
import { EndpointsService } from '../../shared/services/endpoints.service';
import { ITableColumn, productTableColumnsMock } from '../../shared/types/ITable.model';
import { IProduct, productsMock } from '../../shared/types/IProduct.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [GenericFieldComponent, GenericButtonComponent, TableViewComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public productTableColumns: ITableColumn[] = productTableColumnsMock;
  public products: IProduct[] = productsMock;

  constructor(
    private _endpoints: EndpointsService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._getProducts();
  }

  private _getProducts(): void {
    console.log('get products');
    this._endpoints.getProducts().subscribe({
      next: (response) => {
        console.log('products', response);
      },
      error: (error) => {
        console.log('prod error', error);
      }
    });
  }
}
