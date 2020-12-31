import { Injectable } from '@angular/core';
import { Maintenance } from '../../models/maintenance';
import { MaintenanceCalendar } from '../../models/maintenance-calendar';
import { MaintenanceService } from './maintenance.service';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceCalendarService {

  
constructor() { }


createCalendar(maintenances :Maintenance[]){
 console.log(maintenances);
 
  const mCL: MaintenanceCalendar[]=[];


   for(const line of maintenances){
    const mC  = new MaintenanceCalendar();
    mC.title=line.actionType.code+ " Pour  " +line.patrimony.code ;
    mC.date=new Date(line.interventionDate).toISOString();
    mCL.push(mC)
   }
   
return mCL;

}

}
