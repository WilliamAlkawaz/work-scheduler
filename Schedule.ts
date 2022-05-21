export class Schedule {
    scheduleId: number = 0;
    id: number = 0; 
    weekDay: string = ''; 
    assigned: boolean[] = [];
    times: number[] = []; 
    workType: string[] = []; 
    barberId: number = 0; 
}