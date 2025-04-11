export class MriScan {
  imageFile !:File
  metadata!: MetaData;
}

export class MetaData {
  type!: string;
  view_type!: string;
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
export interface DiagnosticResult {
  status: string;
  acl_prob: number;
  meniscus_prob: number;
  visualization: string;
}

export interface MriDiagnosticResponse {
  result: DiagnosticResult;
  report_url: string;
  mri_scan: string;
}

