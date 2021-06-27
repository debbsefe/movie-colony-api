export class NotificationModel {
  constructor(readonly results?: Results[], readonly total_pages?: number) {
    this.results = results;
    this.total_pages = total_pages;
  }
}

export class Results {
  id?: number;
  name?: string;
  fcm?: string;
}
