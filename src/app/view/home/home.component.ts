import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Document} from '../../models/document.model';
import {DocumentService} from '../../services/document.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  document: Document = {id: '', doc: ''};
  private docSu$: Subscription;

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.docSu$ = this.documentService.currentDocument.subscribe(document => {
      if (document) {
        this.document = document;
      }
    });
  }

  ngOnDestroy(): void {
    this.docSu$.unsubscribe();
  }

  editDoc(): void {
    this.documentService.editDocument(this.document);
  }

  addNEw(): void {
    this.documentService.newDocument();
    this.documentService.getDocument('text');
  }

  goToChat(): void {
    this.documentService.getDocument('text');
  }
}
