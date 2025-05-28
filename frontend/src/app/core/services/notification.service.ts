import { Injectable } from '@angular/core';
import { NotificationSchema } from '../models/notification.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import * as url from '../../data/url';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private socket!: Socket;
  private notificationSubject: BehaviorSubject<NotificationSchema[]> =
    new BehaviorSubject<NotificationSchema[]>([]);
  public notification$ = this.notificationSubject.asObservable();
  user!: User;
  constructor(private http: HttpClient, private userService: UserService,private toast : ToastrService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;

      // Only initialize socket connection if we have a valid user ID
      if (this.user && this.user._id) {
        this.initializeSocketConnection();
      }
    });
    this.notification$ = this.notificationSubject.asObservable();

    this.getAllNotifications().subscribe();
  }

  private initializeSocketConnection() {
    // Close existing connection if any
    if (this.socket) {
      this.socket.disconnect();
    }

    // Create new connection with user ID
    this.socket = io(url.BASEURL, {
      query: { userId: this.user._id },
    });

    console.log('Socket initialized with user ID:', this.user._id);

    // Re-register event listeners
    this.registerSocketEvents();
  }

  private registerSocketEvents() {
    // Register all your socket event listeners here
    this.socket.on('notification', (data) => {
      // Handle notification event
      this.notificationSubject.next([data, ...this.notificationSubject.value]);
      this.toast.info('New Notification recieved');
      console.log(data);

    });

    this.socket.on('loading', (data) => {
      // Handle loading event
      this.notificationSubject.next([data, ...this.notificationSubject.value]);
      this.toast.info('Analysis in progress', 'Loading');
      // Update loading state in your component or service as needed
    });

    this.socket.on('failed', (data) => {
      // Handle failed event
      this.notificationSubject.next([data, ...this.notificationSubject.value]);
      this.toast.error('Upload failed', 'Error');
    });

    this.socket.on('access-notification', (data) => {
      // Handle access notification event
      this.notificationSubject.next([data, ...this.notificationSubject.value]);
      this.toast.error('Contact ACLyze AI for access', 'Access Denied');
    });
  }

  onNotification(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('notification', callback);

    }
  }
  onLoading(callback: (data: any) => void) {
    this.socket.on('loading', callback);
  }
  onFailure(callback: (data: any) => void) {
    this.socket.on('failed', callback);
  }
  onAccessDenied(callback: (data: any) => void) {
    this.socket.on('access-notification', callback);
  }

  getNotificationsCount(): Observable<any> {
    return this.http.get<any>(url.NOTIFICATIONS_COUNT);
  }
  get notifications() {
    return this.notificationSubject.value;
  }

  getAllNotifications(): Observable<NotificationSchema[]> {
    return this.http.get<NotificationSchema[]>(url.NOTIFICATIONS_GET_ALL).pipe(
      tap((res: NotificationSchema[]) => {
        this.notificationSubject.next(res);
      }),
      catchError((error) => {
        console.error('Error fetching notifications:', error);
        return throwError(() => error);
      })
    );
  }

  addNotification(
    notification: NotificationSchema
  ): Observable<NotificationSchema> {
    return this.http
      .post<NotificationSchema>(url.NOTIFICATIONS_ADD, notification)
      .pipe(
        tap((res: NotificationSchema) => {
          this.notificationSubject.next([
            res,
            ...this.notificationSubject.value,
          ]);
        }),
        catchError((error) => {
          console.error('Error adding notification:', error);
          return throwError(() => error);
        })
      );
  }

  deleteNotification(
    notification: NotificationSchema
  ): Observable<NotificationSchema> {
    return this.http
      .delete<NotificationSchema>(
        `${url.NOTIFICATIONS_DELETE}/${notification._id}`
      )
      .pipe(
        tap((res: NotificationSchema) => {
          const notifications = this.notificationSubject.value.filter(
            (notif) => notif._id !== res._id
          );
          this.notificationSubject.next(notifications);
        }),
        catchError((error) => {
          console.error('Error deleting notification:', error);
          return throwError(() => error);
        })
      );
  }
  deleteAllNotifications(): Observable<any> {
    return this.http.delete<any>(url.NOTIFICATIONS_DELETE_ALL).pipe(
      tap(() => {
        // Clear all notifications from the subject
        this.notificationSubject.next([]);
      }),
      catchError((error) => {
        console.error('Error deleting all notifications:', error);
        return throwError(() => error);
      })
    );
  }
}
