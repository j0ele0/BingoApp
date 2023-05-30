import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterRoomPage } from './enter-room.page';

const routes: Routes = [
  {
    path: '',
    component: EnterRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterRoomPageRoutingModule {}
