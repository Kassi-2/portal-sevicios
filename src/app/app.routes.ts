import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SystemDetailComponent } from './components/system-detail/system-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detalle/:id', component: SystemDetailComponent },
    { path: '**', redirectTo: '' }
];
