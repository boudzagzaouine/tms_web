import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trajet-edit',
  templateUrl: './trajet-edit.component.html',
  styleUrls: ['./trajet-edit.component.scss']
})
export class TrajetEditComponent implements OnInit {

  home: MenuItem;

  itemsbreadcrumb: MenuItem[];
  trajetForm: FormGroup;
   types =[];
   typeOfPackagings =[];
   selectedValueExpediteur: string='false';
   selectedValueDestinataire: string='false';

  constructor() { }

  ngOnInit(): void {
    this.types=[

      {name:'Enlévement'},
      {name:'Livraison'},
]

this.typeOfPackagings=[

  {name:'Palette'},
  {name:'Vrac'},
]
  }


  selectedContatExist(event){
   console.log(event);
   console.log(this.selectedValueExpediteur);



  }
}
