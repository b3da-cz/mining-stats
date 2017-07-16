export class TimeUtil {
  static get timeZoneDiffHrs(): number {
    return (new Date().getTimezoneOffset() / 60) * -1;
  }

  static get timestampNow(): number {
    const date = new Date();
    date.setHours(date.getHours() + TimeUtil.timeZoneDiffHrs);
    return date.getTime();
  }

  static getLocalTimestamp(time: any): number {
    const date = new Date(time);
    date.setHours(date.getHours() + TimeUtil.timeZoneDiffHrs);
    return date.getTime();
  }

  static getLocalDateForPipe(time: any): Date {
    const date = new Date(time);
    date.setHours(date.getHours() + (TimeUtil.timeZoneDiffHrs * -1));
    return date;
  }

  static convertTimestampForInputElement(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString().substring(0, date.toISOString().length - 1);
  }
}
