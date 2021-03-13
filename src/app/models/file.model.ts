export interface IFileModel {
  invite_link?: string;
  name: string;
  data: string;
  progress?: number;
}

export interface IPropertiesModel {
  readonly: boolean;
  save: boolean;
  download: boolean;
  language: string;
}

export interface IFullFileModel extends IFileModel {
  id?: string;
  properties: IPropertiesModel;
}
