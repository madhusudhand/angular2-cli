import { Routes, RouterModule } from '@angular/router';
import { LoginComponent }    from './login.component';

const routes: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'login/:id', component: LoginComponent }
];

export const loginRouteProviders: any[] = [

];
export const loginRoutes = RouterModule.forChild(routes);
