import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

// cuando los usuarios entran a la aplicacion simenpre entran a
// dominio.com/'' o dominio.com/
const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
  },
  {
    path:'404',
    component: Error404PageComponent,
  },
  {
    path:'',
    redirectTo: 'heroes',
    // se pone en la ruta principal para que redireccione a heroes
    pathMatch: 'full',
  },
  {
    path:'**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
