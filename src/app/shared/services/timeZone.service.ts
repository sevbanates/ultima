import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TimezoneService {
    getTimezoneOffset(): number {
        return new Date().getTimezoneOffset() / 60;
    }

    convertDateToISOString(model: any): any {
        if (model === null || model === undefined) {
            return model;
        }
        if (typeof model !== 'object') {
            return model;
        }

        for (const key of Object.keys(model)) {
            const value = model[key];
            if (value) {
                if (value instanceof Date) {
                    model[key] = this.dateConvert(value);
                } else if (typeof value === 'object') {
                    this.convertDateToISOString(value);
                }
            }
        }
        return model;
    }

    private dateConvert(value: Date): string {
        const localTimezoneOffset = this.getTimezoneOffset();
        let newDate: Date;
        if (localTimezoneOffset > 0) {
            newDate = new Date(
                value.setHours(value.getHours() - localTimezoneOffset)
            );
        } else {
            newDate = new Date(
                value.setHours(value.getHours() + Math.abs(localTimezoneOffset))
            );
        }
        return newDate.toISOString();
    }
}
