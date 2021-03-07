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
import {HomeComponent} from './view/home/home.component';
import {DocumentService} from './services/document.service';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';
import {MyFilesComponent} from './view/my-files/my-files.component';
import {NavbarComponent} from './view/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FileDropDirective} from './directives/file-drop.directive';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FileService} from './services/file.service';

const config: SocketIoConfig = {url: environment.socketUrl, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MyFilesComponent,
    NavbarComponent,
    FileDropDirective
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
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    DocumentService,
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
