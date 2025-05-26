export class NotificationSchema {
    title!: string;
    message!: string;
    _id?:string;
    userID?: number;
    read?:boolean;
    type!: string;
    reportID?:string;
}

export const notification:NotificationSchema=
    {
        "userID": 0,
        "title": "Analyzing",
        "message": "Ai is processing the mri",
        "type": "working",
        "read":false,
        "_id": "67fef9f96d7216c664e68d72",
}