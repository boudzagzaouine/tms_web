import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Responsability } from './../../../../shared/models/responsability';
import { ResponsabilityService } from './../../../../shared/services/api/responsability.service';
import { Agent } from './../../../../shared/models/agent';
import { AuthenticationService } from './../../../../shared/services';
import { AgentService } from './../../../../shared/services/api/agent.service';

@Component({
  selector: 'app-agent-edit',
  templateUrl: './agent-edit.component.html',
  styleUrls: ['./agent-edit.component.css']
})
export class AgentEditComponent implements OnInit {

  @Input() selectedAgent = new Agent();
  @Input() editMode: number;
  @Output() showDialog = new EventEmitter<boolean>();

  agentForm: FormGroup;
  isFormSubmitted = false;
  displayDialog: boolean;
  title = 'Modifier un Agent';
  subscriptions= new Subscription();
responsabilityList:Array<Responsability>= [];

  constructor(private agentService: AgentService,
    private authentificationService:AuthenticationService,
    private responsabilityService:ResponsabilityService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

  this.responsabilityService.findAll().subscribe(
      data => {
        this.responsabilityList = data;
  
      }
    )
  

    if (this.editMode === 1) {
      this.selectedAgent = new Agent();
      this.title = 'Ajouter un Agent';

      this.agentService.generateCode().subscribe(
        code => {
       this.selectedAgent.code = code;
       
        this.initForm();
    });

    }

    this.displayDialog = true;
    this.initForm();


  
  }

  initForm() {
    this.agentForm = new FormGroup({
      'fcode': new FormControl(this.selectedAgent.code, Validators.required),
      'fname': new FormControl(this.selectedAgent.name, Validators.required),
      'fcin': new FormControl(this.selectedAgent.cin, Validators.required),
      'fbirthdate': new FormControl(this.selectedAgent.birthDate),
      'ftele': new FormControl(this.selectedAgent.tele1, Validators.required),
      'fresponsability': new FormControl(this.selectedAgent.responsability, Validators.required),

    });
  }


  onSubmit() {
    this.isFormSubmitted = true;
    if (this.agentForm.invalid) { return; }
    this.spinner.show();
    this.selectedAgent.code = this.agentForm.value['fcode'];
    this.selectedAgent.name = this.agentForm.value['fname'];
    this.selectedAgent.cin = this.agentForm.value['fcin'];
    this.selectedAgent.birthDate = this.agentForm.value['fbirthdate'];
    this.selectedAgent.tele1 = this.agentForm.value['ftele'];

 this.selectedAgent.owner=this.authentificationService.getDefaultOwner();
 console.log("owner");
 
 console.log(this.selectedAgent.owner);
 
    this.subscriptions.add( this.agentService.set(this.selectedAgent).subscribe(
      data => {
        //this.toastr.success('Elément est Enregistré avec succès', 'Edition');
        this.messageService.add({severity:'success', summary: 'Edition', detail: 'Elément est Enregistré avec succès'});

        // this.loadData();
        this.displayDialog = false;
        this.isFormSubmitted = false;
        this.spinner.hide();
      },
      error => {
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur'});

       // this.toastr.error(error.error.message, 'Erreur');
        this.spinner.hide();
      },
      () => this.spinner.hide()
    ));

  }

  onSelectAgent(event){
  this.selectedAgent.responsability=event.value as Responsability;
  }

  onShowDialog() {
    let a = false;
    this.showDialog.emit(a);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
