export class MriScan {
  imageFile !:File
  metadata!: MetaData;
}

export class MetaData {
  type!: string;
  view!: string;
  fileType!: 'dicom' | 'jpeg' | 'png' | 'jpg';
}

export class MriResponse {
  message!: string;
  _id!: string;
  patientId!: string; // Reference to User
  imageUrl!: string; // Cloud storage link
  metadata!: MetaData;
  uploadedAt!: Date;
}
