import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {IFullFileModel} from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileSocketService {
  currentFile = this.socket.fromEvent<IFullFileModel>('file');

  constructor(private socket: Socket) {
  }

  getFile(id: string): void {
    this.socket.emit('getFile', id);
  }

  newFile(file: IFullFileModel): void {
    this.socket.emit('addFile', {file});
  }

  editFile(file: IFullFileModel): void {
    this.socket.emit('editFile', file);
  }

}
