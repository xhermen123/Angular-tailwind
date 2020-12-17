import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'filter-quality',
    loadChildren: () =>
      import('./filter-quality/filter-quality.module').then(
        m => m.FilterQualityModule
      ),
    data: { breadcrumb: 'Filter Quality' },
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
    data: { breadcrumb: 'Documentation' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
