import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        pathMatch: 'full',
        component: ProductsComponent
    }
];
