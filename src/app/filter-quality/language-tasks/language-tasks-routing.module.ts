import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageTasksComponent } from './language-tasks.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [{
  path: '',
  component: LanguageTasksComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'create',
      component: DetailsComponent,
      data: {
        breadcrumb: 'Create',
        title: 'Language Tasks Create'
      }
    },
    {
      path: ':id',
      component: DetailsComponent,
      data: {
        breadcrumb: 'Details',
        title: 'Language Tasks Details'
      }
    },
    // {
    //   path: ':id/edit',
    //   component: DetailsComponent,
    //   data: {
    //     breadcrumb: 'Details',
    //     title: 'Language Tasks Details'
    //   }
    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageTasksRoutingModule { }
