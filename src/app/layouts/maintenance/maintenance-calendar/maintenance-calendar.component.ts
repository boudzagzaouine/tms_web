import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from './../../../shared/services/api/maintenance.service';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import { Maintenance } from './../../../shared/models/maintenance';
import { MaintenanceCalendarService } from './../../../shared/services/api/maintenance-calendar.service';
import { MaintenanceCalendar } from './../../../shared/models/maintenance-calendar';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-maintenance-calendar',
  templateUrl: './maintenance-calendar.component.html',
  styleUrls: ['./maintenance-calendar.component.css']
})
export class MaintenanceCalendarComponent implements OnInit {
  maintenanceList: Maintenance[]=[];
  maintenanceCalendarList: MaintenanceCalendar[]=[];
  calendarOptions: CalendarOptions;


  
  constructor(private maintenanceService: MaintenanceService,
              private maintenanceCalendarService:MaintenanceCalendarService,
              private messageService: MessageService) {}


  ngOnInit() {
   this.loadMaintenance();

// this.maintenanceCalendarList= this.maintenanceCalendarService.createCalendar(this.maintenanceList);
 // console.log(this.maintenanceCalendarList );

     
            }

  loadMaintenance(){
    this.maintenanceService.findAll().subscribe(
      data =>{
      this.maintenanceList= data; 
          console.log(this.maintenanceList);
         this.maintenanceCalendarList=this.maintenanceCalendarService.createCalendar(this.maintenanceList);
         console.log(this.maintenanceCalendarList);

          this.calendarOptions = {
            
             
               initialView: 'dayGridMonth',
             //dateClick: this.handleDateClick.bind(this), // bind is important!
              headerToolbar:{
             left:'prev,next,today',
             center:'title',
             right:'dayGridMonth,dayGridWeek,dayGridDay,ListWeek'
              },
              locale:frLocale,
              events:   this.maintenanceCalendarList,
              eventClick: this.handleEventClick.bind(this),
              displayEventTime: false

             
              
           };
     });

  }

  handleEventClick(arg) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Maintenance', detail:arg.event.title});


    console.log(arg.event.title);
  }
 /* handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }*/
}
