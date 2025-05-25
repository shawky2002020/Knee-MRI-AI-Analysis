export class MriScan {
  imageFile !: File
  metadata!: MetaData;
}

export const allowedExtensions = ['jpg', 'jpeg', 'png', 'dicom'];
export class MetaData {
  name!:string;
  age!: number;
  gender!: string;
  type?: string;
  view_type?: string;
  fileType?: string;
  _id?: string;
  viewed?:boolean;
}



