import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BukuService } from './services/buku.service';
import {
  AddBukuModal,
  bukulistComponent,
} from './shared/list-buku/bukulist.component';
import {
  DetailbukuComponent,
  EditBukuModal,
} from './shared/detailbuku/detailbuku.component';
import {
  AddUserModal,
  UserlistComponent,
} from './shared/list-user/userlist.component';
import { UsersService } from './services/users.service';
import {
  AddPinjamModal,
  ListPinjamComponent,
} from './shared/list-pinjam/list-pinjam.component';
import {
  DetailuserComponent,
  EditUserModal,
} from './shared/detailuser/detailuser.component';
import { DetailpinjamanComponent } from './shared/detailpinjaman/detailpinjaman.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  SnackbarLogin,
  SnackbarSuccess,
  SnackbarUpdate,
  SnackbarWarning,
} from './components/snackbar/snackbar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ConfirmLogOut,
  LoginComponent,
} from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { PinjamanService } from './services/pinjaman.service';
import { WebcamModule } from 'ngx-webcam';

@NgModule({
  declarations: [
    AppComponent,
    bukulistComponent,
    DetailbukuComponent,
    UserlistComponent,
    ListPinjamComponent,
    DetailuserComponent,
    DetailpinjamanComponent,
    NavigationComponent,
    EditUserModal,
    AddUserModal,
    AddPinjamModal,
    AddBukuModal,
    EditBukuModal,
    ConfirmLogOut,
    SnackbarSuccess,
    SnackbarUpdate,
    SnackbarWarning,
    SnackbarLogin,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    WebcamModule,
  ],
  providers: [BukuService, UsersService, AuthService, PinjamanService],
  bootstrap: [AppComponent],
})
export class AppModule {}
