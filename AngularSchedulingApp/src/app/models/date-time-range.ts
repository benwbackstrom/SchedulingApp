export class DateTimeRange {
    startDate!: Date;
    endDate!: Date;
    startTime!: number;
    endTime!: number;

    setStartDate(dateString:string): void {
        let startDate = new Date(dateString);
        this.startDate = startDate;
    }
    getStartDate(): Date {
        return this.startDate;
    }
    setEndDate(dateString:string): void {
        let endDate = new Date(dateString);
        this.endDate = endDate;
    }
    getEndDate(): Date {
        return this.endDate;
    }
    setStartTime(time:number): void {
        this.startTime = time;
    }
    getStartTime(): number {
        return this.startTime;
    }
    setEndTime(time:number): void {
        this.endTime = time;
    }
    getEndTime(): number {
        return this.endTime;
    }
}
