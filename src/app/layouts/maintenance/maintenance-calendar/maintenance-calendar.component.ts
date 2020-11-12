import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from './../../../shared/services/api/maintenance.service';
//import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-maintenance-calendar',
  templateUrl: './maintenance-calendar.component.html',
  styleUrls: ['./maintenance-calendar.component.css']
})
export class MaintenanceCalendarComponent implements OnInit {

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth'
  // };

  maintenanceList: any[];
  options: any;
          
  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
      // this.maintenanceService.findAll().subscribe(events => {this.maintenanceList = events;});
      
      // this.options = {
      //     plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      //     defaultDate: '2019-10-01',
      //     header: {
      //         left: 'prev,next',
      //         center: 'code',
      //         right: 'dayGridMonth,timeGridWeek,timeGridDay'
      //     },
      //     editable: true
      // };
  }
}
