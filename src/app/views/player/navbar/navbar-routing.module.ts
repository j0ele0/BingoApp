import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarPage } from './navbar.page';
import {IsLoggedInService} from '../../../services/is-logged-in.service';

const routes: Routes = [
  {
    path: '',
    component: NavbarPage,
    children: [
      {
        path: 'cards',
        loadChildren: () => import('../round/round.module').then(m => m.RoundPageModule)
      },
      {
        path: 'points',
        loadChildren: () => import('../points/points.module').then(m => m.PointsPageModule)
      },
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarPageRoutingModule {}
