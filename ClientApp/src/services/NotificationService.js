
export class NotificationService {
    
    requestPermission() {
        Notification.requestPermission(
            (permission) => { }
        )
    }

    notify(message) {
        if (!("Notification" in window)) {
            // Browser notifications not allowed. Do nothing.
            return false;
        }

        Notification.requestPermission(
            (permission) => {
                if (permission === "granted") {
                    new Notification(message);
                }
            }
        )
    }
}