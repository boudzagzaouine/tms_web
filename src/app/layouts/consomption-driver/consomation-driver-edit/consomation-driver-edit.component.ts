import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consomation-driver-edit',
  templateUrl: './consomation-driver-edit.component.html',
  styleUrls: ['./consomation-driver-edit.component.css']
})
export class ConsomationDriverEditComponent implements OnInit {

  fr: any;
  constructor() { }

  ngOnInit() {


    this.fr = {
      firstDayOfWeek: 1,
      dayNames: ['dimanche', 'lundi', 'mardi ', 'mercredi', 'mercredi ', 'vendredi ', 'samedi '],
      dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jun', 'jui', 'aoû', 'sep', 'oct', 'nov', 'dic'],
      today: 'Aujourd hui',
      clear: 'Supprimer'
    };
  }
}
