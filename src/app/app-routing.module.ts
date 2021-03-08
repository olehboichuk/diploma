import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './view/login/login.component';
import {RegisterComponent} from './view/register/register.component';
import {EditFileComponent} from './view/edit-file/edit-file.component';
import {MyFilesComponent} from './view/my-files/my-files.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'edit-file/:file_id', component: EditFileComponent},
  {path: 'edit-file-invite/:invite_link', component: EditFileComponent},
  {path: 'my-files', component: MyFilesComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
