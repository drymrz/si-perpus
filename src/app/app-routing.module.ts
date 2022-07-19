import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { bukulistComponent } from './shared/list-buku/bukulist.component';
import { DetailbukuComponent } from './shared/detailbuku/detailbuku.component';
import { DetailpinjamanComponent } from './shared/detailpinjaman/detailpinjaman.component';
import { DetailuserComponent } from './shared/detailuser/detailuser.component';
import { ListPinjamComponent } from './shared/list-pinjam/list-pinjam.component';
import { UserlistComponent } from './shared/list-user/userlist.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: NavigationComponent,
    children: [
      { path: '', redirectTo: '/home/(content:datapinjaman)', pathMatch: 'full' },
      { path: 'databuku', component: bukulistComponent, outlet: 'content' },
      { path: 'datauser', component: UserlistComponent, outlet: 'content' },
      {
        path: 'datapinjaman',
        component: ListPinjamComponent,
        outlet: 'content',
      },
      {
        path: 'detailbuku/:id',
        component: DetailbukuComponent,
        outlet: 'content',
      },
      {
        path: 'detailuser/:id',
        component: DetailuserComponent,
        outlet: 'content',
      },
      {
        path: 'detailpinjaman/:id',
        component: DetailpinjamanComponent,
        outlet: 'content',
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
