import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FileSocketService} from '../../services/file-socket.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FileService} from '../../services/file.service';
import {IFullFileModel} from '../../models/file.model';
import {ToastrService} from 'ngx-toastr';
import {CodeModel} from '@ngstack/code-editor';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent implements OnInit, OnDestroy {
  private docSu$: Subscription;
  private fileId: string;
  private inviteLink: string;
  public file: IFullFileModel = {data: '', name: '', properties: {readonly: true, save: true, download: true, language: 'text'}};
  public owner = false;
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: '',
    uri: '',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };
  languages: Array<string> = ['text', 'abap', 'aes', 'apex', 'bat', 'c', 'coffeescript', 'cpp', 'csharp', 'csp', 'css', 'dart', 'dockerfile', 'fsharp', 'go', 'graphql', 'handlebars', 'html', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lexon', 'lua', 'msdax', 'mysql', 'objective-c', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'plaintext', 'powershell', 'python', 'r', 'redis', 'ruby', 'rust', 'scala', 'scheme', 'scss', 'shell', 'sol', 'sql', 'st', 'swift', 'twig', 'typescript', 'xml', 'yaml'];
  themes: Array<any> = [{option: 'vs', name: 'Light'}, {option: 'vs-dark', name: 'Dark'}, {option: 'hc-black', name: 'High contrast'}];

  onCodeChanged(value): void {
    if (this.file.data !== value) {
      this.file.data = value;
      this.editDoc();
    }

  }

  constructor(private fileSocketService: FileSocketService,
              private fileService: FileService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('file_id')) {
        this.fileId = paramMap.get('file_id');
        this.owner = true;
        this.fileService.getUserFileById(this.fileId).subscribe(res => {
          this.file = res;
          this.file.properties = {
            save: true,
            download: true,
            readonly: true,
            language: 'text'
          };
          this.codeModel = {
            language: this.file.properties.language,
            uri: this.file.name,
            value: this.file.data
          };
          this.addNewFile();
        }, error => {
          this.toastr.error(error.error.message, 'ERROR!');
          this.router.navigate(['/my-files']);
        });
      }
      if (paramMap.has('invite_link')) {
        this.inviteLink = paramMap.get('invite_link');
        this.fileService.getFileByLink(this.inviteLink).subscribe(res => {
          this.fileId = res.id;
          this.codeModel.value = this.file.data;
          this.goToChat();
        }, error => {
          this.toastr.error(error.error.message, 'ERROR!');
          this.router.navigate(['/my-files']);
        });
      }
    });
  }

  ngOnInit(): void {
    this.docSu$ = this.fileSocketService.currentFile.subscribe(file => {
      if (file) {
        this.file = file;
        this.codeModel = {
          language: this.file.properties.language,
          uri: this.file.name,
          value: this.file.data
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.docSu$.unsubscribe();
  }

  editDoc(): void {
    this.fileSocketService.editFile(this.file);
  }

  addNewFile(): void {
    this.fileSocketService.newFile(this.file);
  }

  goToChat(): void {
    this.fileSocketService.getFile(this.fileId);
  }

  copyInputMessage(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('Copied');
  }

  save(): void {
    this.fileService.saveFileChanges(this.file).subscribe(res => {
      this.toastr.success('File changes saved');
    }, error => {
      this.toastr.error(error.error.message, 'ERROR!');
    });
  }

  download(): void {
    this.downloadObject(this.file.data, this.file.name);
  }

  changeInput(): void {
    this.editDoc();
  }

  changeLanguage(value): void {
    this.codeModel = {
      language: value,
      uri: this.file.name,
      value: this.file.data
    };
    this.file.properties.language = value;
    this.editDoc();
  }

  changeTheme($event: any): void {
    this.theme = $event;
  }

  downloadObject(exportObj, exportName): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportObj);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

}
