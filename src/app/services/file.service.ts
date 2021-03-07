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

  public addFile(body: IFileModel): Observable<IFullFileModel> {
    return this.http.post<IFullFileModel>(environment.apiUrl + FILE_API.file, body);
  }

  public deleteFile(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${FILE_API.file}/${id}`);
  }

}
