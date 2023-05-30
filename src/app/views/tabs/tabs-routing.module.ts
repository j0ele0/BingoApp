import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {IsLoggedInService} from '../../services/is-logged-in.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'join',
        loadChildren: () => import('../player/enter-room/enter-room.module').then(m => m.EnterRoomPageModule)
      },
      {
        path: 'enter-room/:bingoroomcode/round/:round',
        loadChildren: () => import('../player/enter-name/enter-name.module').then(m => m.EnterNamePageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('../create-room/create-room.module').then(m => m.CreateRoomPageModule),
        canLoad: [IsLoggedInService]
      },
      {
        path: 'profile',
        loadChildren: () => import('../game-master/profil/profil.module').then(m => m.ProfilPageModule),
        canLoad: [IsLoggedInService]
      },
      {
        path: 'login',
        loadChildren: () => import('../../modals/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'register',
        loadChildren: () => import('../../modals/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/join',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/join',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
