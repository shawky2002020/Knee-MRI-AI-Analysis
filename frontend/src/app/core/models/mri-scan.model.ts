export class MriScan {
  imageFile !: File
  metadata!: MetaData;
}

export const allowedExtensions = ['jpg', 'jpeg', 'png', 'dicom'];
export class MetaData {
  type!: string;
  view_type!: string;
  fileType!: string;
  _id?: string;
}



