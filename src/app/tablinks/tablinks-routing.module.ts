import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'profile',
        children: 
          [
            {
              path:'',
              loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
            }
          ]
      },
      {
        path: '',
        redirectTo: '/tablinks/profile',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/profile',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
