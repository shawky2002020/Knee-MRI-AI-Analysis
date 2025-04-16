export class NotificationSchema {
    _id?:string;
    userID!: number;
    title!: string;
    message!: string;
    read!:boolean;
    type!: string;
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