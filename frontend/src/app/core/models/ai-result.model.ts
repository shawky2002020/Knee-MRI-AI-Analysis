import { allowedExtensions, MetaData } from "./mri-scan.model";

export interface DiagnosticResult {
    status: string;
    acl_prob: number;
    meniscus_prob: number;
  }
  
  export class MriDiagnosticResponse {
    _id!: string;
    userId!: string;
    metadata!: MetaData;
    result!: DiagnosticResult;
    report!: string;
    mri_scan!: string;
    heat_map!: string;
  }

export interface ScanResponse {
  scans: MriDiagnosticResponse[];
  page: number;
  limit: number;
  totalPages: number;
  totalScans: number;
}
  
  
  export const diagnosticResult = {
    _id: "67f9b7acfd0aaa4b845a4189",
    userId: "67b8f5286802ba39283e07ff",
    metadata: {
      type: "MRI",
      view_type: "axial",
      fileType:allowedExtensions[0]
    },
    result: {
      status: "normal",
      acl_prob: 0.37376952171325684,
      meniscus_prob: 0.2022215723991394
    },
    mri_scan: "https://res.cloudinary.com/derpvdhiz/image/upload/v1744418731/diagnostic_results/67b8f5286802ba39283e07ff/scans/raozz75zqh2rt3wiflsk.png",
    heat_map: "https://res.cloudinary.com/derpvdhiz/image/upload/v1744418730/diagnostic_results/67b8f5286802ba39283e07ff/heatmaps/000_temp_image_normal.png",
    report: "https://res.cloudinary.com/derpvdhiz/raw/upload/v1744418732/diagnostic_results/67b8f5286802ba39283e07ff/reports/diagnostic_report_67b8f5286802ba39283e07ff_20250412_024532.csv",
  };
  