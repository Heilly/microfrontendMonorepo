import { Routes } from '@angular/router';
import { routesMfShopping } from '../../../mf-shopping/src/app/app.routes';

export const routes: Routes = [
    {
        path:'',
        loadChildren:() => import('mfShopping/Routes').then( r => r.routesMfShopping)
    },
    {
        path:'payment',
        loadChildren:() => import('mfPayment/Routes').then( r => r.routesmfPayment)
    },
];
