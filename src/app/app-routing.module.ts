import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeroComponent} from "./public/pages/hero/hero.component";
import {NotFoundComponent} from "./public/pages/not-found/not-found.component";
import {LayoutComponent} from "./shared/pages/layout/layout.component";
import {UserGuard} from "./iam/guard/user.guard";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirigir a la ruta del dashboard
      //{ path: 'dashboard', component: DashboardComponent }, // Agrega aquí tu componente Dashboard
      { path: 'renting', loadChildren: () => import('./renting/renting.module').then(m => m.RentingModule) },
    ]
  },
  /** IAM module: Login, register, ETC **/
  { path: 'auth', loadChildren: () => import('./iam/iam.module').then(m => m.IAMModule) },

  /** Public module: LandingPage, NotFound, ETC **/
  { path: 'public', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'public/page-not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'public/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
