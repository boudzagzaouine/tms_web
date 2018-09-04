import { Injectable } from "@angular/core";

@Injectable()
export class DateAdapterService {
    toDate(date: any): Date {
        return date && date.year && date.month
            ? new Date(date.year, date.month - 1, date.day, 12)
            : null;
    }
}
