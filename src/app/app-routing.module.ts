import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { CarsComponent } from './cars/cars.component';


export const routes: Routes = [
  { path: '', redirectTo: 'showrooms', pathMatch: 'full' },
  { path: 'showrooms', component: ShowroomsComponent },
  { path: 'cars', component: CarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
