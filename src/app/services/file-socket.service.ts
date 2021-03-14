import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {IFullFileModel} from '../models/file.model';
import {IMessageModel} from '../view/messenger/messenger.component';

@Injectable({
  providedIn: 'root'
})
export class FileSocketService {
  currentFile = this.socket.fromEvent<IFullFileModel>('file');
  messages = this.socket.fromEvent<IMessageModel>('message');

  constructor(private socket: Socket) {
    this.socket.on('connect', () => this.onConnect());
    this.socket.on('disconnect', () => this.onDisconnect());
  }

  async onConnect(): Promise<void> {
    console.log('connected to backend!');
  }

  onDisconnect(): void {
    console.log('disconnected from backend!');
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

  sendMessage(message: IMessageModel): void {
    this.socket.emit('sendMessage', message);
  }

  connectUser(user: string): void {
    this.socket.emit('connectUser', user);
  }

  disconnectUser(user: string): void {
    this.socket.emit('disconnectUser', user);
  }

  disconnect(): void {
    this.socket.emit('disconnect');
  }

}
