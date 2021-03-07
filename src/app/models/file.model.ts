export interface IFileModel {
  name: string;
  data: string;
  progress?: number;
}

export interface IFullFileModel extends IFileModel {
  id?: string;
  invite_link?: string;
}
