import { NgModule } from '@angular/core';
import { AddNewHeroPageComponent } from './pages/add-new-hero-page/add-new-hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero', component: AddNewHeroPageComponent },
      { path: 'search', component: SearchPageComponent},
      { path: 'edit/:id', component: AddNewHeroPageComponent},
      { path: 'list', component: ListPageComponent},
      { path: ':id', component: HeroPageComponent},
      { path: ':id', component: HeroPageComponent},
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
