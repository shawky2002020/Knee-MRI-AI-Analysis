export interface DiagnosisCount {
    normal: number;
    acl: number;
    meniscus: number;
    ['acl and meniscus']: number;
    total: number;
}

export interface DiagnosisPercentage {
    normal: number;
    acl: number;
    meniscus: number;
    aclAndMeniscus: number;
}

export class DiagnosisDistributionResponse {
    counts!: DiagnosisCount;
    percentages!: DiagnosisPercentage;
}

export interface UserScanSummary {
    count: number;
    userName: string;
    userId: string;
}

export class UserScanDistributionResponse {
    userScanCounts: UserScanSummary[];
    totalUsers: number;

    constructor(userScanCounts: UserScanSummary[] = [], totalUsers: number = 0) {
        this.userScanCounts = userScanCounts;
        this.totalUsers = totalUsers;
    }
}
