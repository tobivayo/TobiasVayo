import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { ProductFormComponent } from './features/create-product/product-form.component';

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
        component: ProductFormComponent
    },
    {
        path: 'edit/:id',
        title: 'Edit Product',
        pathMatch: 'full',
        component: ProductFormComponent
    }
];
