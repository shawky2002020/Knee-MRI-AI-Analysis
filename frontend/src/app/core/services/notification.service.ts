import { Injectable } from '@angular/core';
import { NotificationSchema } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications :NotificationSchema [] = [];

  constructor() { }
}
