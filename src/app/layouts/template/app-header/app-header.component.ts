import { AuthenticationService } from '../../../shared/services/api/authentication.service';
import { Component, AfterViewInit, OnInit, DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/services/api/notification.service';
import { Observable, Observer } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Notification } from './../../../shared/models/notification';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',

})
export class AppHeaderComponent implements OnInit {

  notificationSize: number ;
  notificationMaintenanceList : Array<Notification> = [];
  notificationProductList : Array<Notification> = [];

  user :string ;
  maintenanceCount:number=0;
  productCount:number=0;

  constructor(
    private notificationService : NotificationService,
    private auth: AuthenticationService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {}




  ngOnInit() {
    this.user=this.auth.getCurrentUser().code;
  //  console.log(this.user);

    this.loadData();
     setInterval(()=> {
        this.loadData();
      },60000)

    this.translate.addLangs([
      'en',
      'fr'
    ]);
    this.translate.setDefaultLang('fr');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang.match(/en|fr/)
        ? browserLang
        : 'fr'
    );
  }



  changeLang(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.auth.logout();
  }



 loadData(search: string = '') {

  // this.notificationService.findAll().subscribe(
  //   data=>{

  //     this.notificationMaintenanceList=data.filter(f=> f.notificationType.id== 1); //Maintenance
  //     this.notificationProductList=data.filter(f=> f.notificationType.id== 2); //Product
  //    this.maintenanceCount=this.notificationMaintenanceList.length;
  //    this.productCount=this.notificationProductList.length;
  //   }

  // );



  this.notificationService.sizeSearch(search).subscribe(
    data => {
      this.notificationSize = data;
    }
  );

  this.notificationService.sizeSearch('notificationType.id:1').subscribe(
    data => {
      this.maintenanceCount = data;
    }
  );

  this.notificationService.sizeSearch('notificationType.id:2').subscribe(
    data => {
      this.productCount = data;
    }
  );

}



}
