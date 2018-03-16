import { Injectable } from "@angular/core"
import { DataService } from "./data-service"
import { LocalNotifications } from "@ionic-native/local-notifications"


/*
  Generated class for the NotificationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationService {

    constructor(private dataService: DataService, private localNotification: LocalNotifications) {}

    public getNotificationsByParticipant(participantId) {
        return this.dataService.getJson(`/participants/${participantId}/notifications`)
    }

    public createNotification(id, title, description) {
        this.localNotification.schedule({
            id: id,
            title: title,
            text: description,
            led: '54b27d'
        })
    }

    public viewedNotification(notificationId) {
        return this.dataService.putJson(`/notifications/${notificationId}`, {viewed: true})
    }

}
