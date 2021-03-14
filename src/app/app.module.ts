import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './view/login/login.component';
import {RegisterComponent} from './view/register/register.component';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './services/AuthInterceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {EditFileComponent} from './view/edit-file/edit-file.component';
import {FileSocketService} from './services/file-socket.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';
import {MyFilesComponent} from './view/my-files/my-files.component';
import {NavbarComponent} from './view/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FileDropDirective} from './directives/file-drop.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FileService} from './services/file.service';
import {InviteDialogComponent} from './view/invite-dialog/invite-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule } from 'ngx-toastr';
import { CodeEditorModule } from '@ngstack/code-editor';
import { MessengerComponent } from './view/messenger/messenger.component';
import {MatBadgeModule} from '@angular/material/badge';

const config: SocketIoConfig = {url: environment.socketUrl, options: {}};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditFileComponent,
    MyFilesComponent,
    NavbarComponent,
    FileDropDirective,
    InviteDialogComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    DragDropModule,
    SocketIoModule.forRoot(config),
    MatDialogModule,
    ToastrModule.forRoot(),
    CodeEditorModule.forRoot(),
    MatBadgeModule
  ],
  entryComponents: [InviteDialogComponent],
  providers: [
    AuthService,
    FileSocketService,
    FileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
