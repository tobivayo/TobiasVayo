import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { CreateProductComponent } from './features/create-product/create-product.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        pathMatch: 'full',
        component: ProductsComponent
    },
    {
        path: 'create',
        title: 'New Product',
        pathMatch: 'full',
        component: CreateProductComponent
    }
];
