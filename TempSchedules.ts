export interface TempSchedules {
    id: number;
    date: Date;
    startTime: {
        ticks: number; 
        days: number;
        hours: number;
        milliseconds: number; 
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMinutes: number; 
        totalSeconds: number;
    }; 
    endTime: {
        ticks: number; 
        days: number;
        hours: number;
        milliseconds: number; 
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMilliseconds: number;
        totalMinutes: number; 
        totalSeconds: number;
    };
    hours: number;
    comments: string;
    employeeId: number;
}