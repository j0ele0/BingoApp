import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthService} from './services/auth.service';
import {IsLoggedInService} from './services/is-logged-in.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'enter-room',
    loadChildren: () => import('./views/player/enter-room/enter-room.module').then( m => m.EnterRoomPageModule)
  },/*
  {
    path: 'enter-room/:bingoroomcode/round/:round',
    loadChildren: () => import('./views/player/enter-name/enter-name.module').then(m => m.EnterNamePageModule)
  },*/
  {
    path: 'bingoApp/:bingoroomcode/round/:round/userid/:userid',
    loadChildren: () => import('./views/player/navbar/navbar.module').then(m => m.NavbarPageModule)
  },
  {
    path: 'gameMaster/:bingoroomcode/round/:round',
    loadChildren: () => import('./views/game-master/round/round.module').then( m => m.RoundPageModule),
    canLoad: [IsLoggedInService]
  },
  {
    path: 'profil',
    loadChildren: () => import('./views/game-master/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'create-room',
    loadChildren: () => import('./views/create-room/create-room.module').then( m => m.CreateRoomPageModule)
  }/*,
  {
    path: 'navbar',
    loadChildren: () => import('./views/player/navbar/navbar.module').then( m => m.NavbarPageModule)
  },
  {
    path: 'points',
    loadChildren: () => import('./views/player/points/points.module').then( m => m.PointsPageModule)
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
