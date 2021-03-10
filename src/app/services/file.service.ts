import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment, FILE_API} from '../../environments/environment';
import {IFileModel, IFullFileModel} from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  public getAllUserFiles(): Observable<Array<IFullFileModel>> {
    return this.http.get<Array<IFullFileModel>>(environment.apiUrl + FILE_API.files);
  }

  public getUserFileById(id: string): Observable<IFullFileModel> {
    return this.http.get<IFullFileModel>(`${environment.apiUrl}${FILE_API.file}/${id}`);
  }

  public addFile(body: IFileModel): Observable<IFullFileModel> {
    return this.http.post<IFullFileModel>(environment.apiUrl + FILE_API.file, body);
  }

  public saveFileChanges(body: IFullFileModel): Observable<IFullFileModel> {
    return this.http.put<IFullFileModel>(environment.apiUrl + FILE_API.file, body);
  }

  public deleteFile(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${FILE_API.file}/${id}`);
  }

  public getFileByLink(id: string): Observable<IFullFileModel> {
    return this.http.get<IFullFileModel>(`${environment.apiUrl}${FILE_API.link}/${id}`);
  }

}
