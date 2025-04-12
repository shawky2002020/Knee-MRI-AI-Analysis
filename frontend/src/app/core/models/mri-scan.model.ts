export class MriScan {
  imageFile !: File
  metadata!: MetaData;
}

export class MetaData {
  type!: string;
  view_type!: string;
  fileType!: 'dicom' | 'jpeg' | 'png' | 'jpg';
  _id?: string;
}



export interface DiagnosticResult {
  status: string;
  acl_prob: number;
  meniscus_prob: number;
}

export interface MriDiagnosticResponse {
  _id: string;
  userId: string;
  metadata: MetaData;
  result: DiagnosticResult;
  report: string;
  mri_scan: string;
  heat_map: string;
  createdAt: Date;
}
