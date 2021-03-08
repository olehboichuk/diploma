export interface IFileModel {
  invite_link?: string;
  name: string;
  data: string;
  progress?: number;
}

export interface IFullFileModel extends IFileModel {
  id?: string;
}
