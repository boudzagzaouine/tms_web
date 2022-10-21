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
   loadingTypeList = [];
   completTypeList = [];

   loadingType :string;

  constructor() { }

  ngOnInit(): void {

    this.completTypeList=[{name:'Affretement'},{name:'Transport Dedie'}]

    this.loadingTypeList=[ {name:'Complet'},{name:'Groupage'}]
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

  onSelectLoadingTypes(event) {
    console.log(event.value.code);
    this.loadingType = event.value.name ;
    console.log(this.loadingType);

  }
}
