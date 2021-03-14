import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FileSocketService} from '../../services/file-socket.service';
import {Subscription} from 'rxjs';

export interface IMessageModel {
  message: string;
  user: string;
  time: string;
}

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: Array<IMessageModel> = [];
  message: string;
  private docSu$: Subscription;
  scrollHeight = 0;
  newMessages = 0;
  isChatVisible = true;
  hidden = true;

  @ViewChild('listOfMessages', {static: false}) private myScrollContainer: ElementRef;

  constructor(private fileSocketService: FileSocketService) {
  }

  ngOnInit(): void {
    this.docSu$ = this.fileSocketService.messages.subscribe(message => {
      if (message) {
        this.messages.push(message);
        if (this.isChatVisible) {
          this.newMessages++;
          this.hidden = false;
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.onShowMore(this.myScrollContainer);
  }

  ngOnDestroy(): void {
    this.docSu$.unsubscribe();
  }

  checkUser(user: string): boolean {
    const currUser = localStorage.getItem('login').toLowerCase();
    return currUser === user.toLowerCase();
  }

  sendMessage(message: string): void {
    if (message !== '') {
      const activationDate = new Date();
      const mes = {user: localStorage.getItem('login'), time: `${activationDate.getHours()}:${activationDate.getMinutes()}`, message};
      this.fileSocketService.sendMessage(mes);
      this.messages.push(mes);
      this.message = '';
    }
  }

  onShowMore($event: any): void {
    if ($event && this.scrollHeight !== $event.nativeElement.scrollHeight) {
      this.scrollHeight = $event.nativeElement.scrollHeight;
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) {
      }
    }
  }

  onCollapse(): void {
    if (this.isChatVisible) {
      this.hidden = true;
      this.newMessages = 0;
    }
    this.isChatVisible = !this.isChatVisible;
  }
}
