export interface Schedule {
    id: number; 
    weekDay: string; 
    assigned: boolean[];
    times: number[]; 
    workType: string[]; 
    barberId: number; 
}