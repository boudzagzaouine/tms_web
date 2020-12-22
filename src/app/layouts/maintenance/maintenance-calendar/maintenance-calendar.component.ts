import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from './../../../shared/services/api/maintenance.service';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import frLocale from '@fullcalendar/core/locales/fr';



@Component({
  selector: 'app-maintenance-calendar',
  templateUrl: './maintenance-calendar.component.html',
  styleUrls: ['./maintenance-calendar.component.css']
})
export class MaintenanceCalendarComponent implements OnInit {

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
  
  }

   calendarOptions: CalendarOptions = {
   
    
      initialView: 'dayGridMonth',
    //dateClick: this.handleDateClick.bind(this), // bind is important!
     headerToolbar:{
    left:'prev,next,today',
    center:'title',
    right:'dayGridMonth,dayGridWeek,dayGridDay,ListWeek'
     },
     locale:frLocale,
    events: [
      { title: 'event 1', date: '2020-12-21' },
      { title: 'event 2', date: '2020-12-22' }
    ]
  };
  

 /* handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }*/
}
