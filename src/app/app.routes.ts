import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        pathMatch: 'full',
        component: ContentLayoutComponent
    }
];
