import { GroupHabilitation } from "./../../../shared/models/group-habilitation";
import { log } from "console";

import { GroupHabilitationService } from "./../../../shared/services/api/group-habilitation.service";
import { HabilitationService } from "./../../../shared/services/api/habilitation.service";
import { Habilitation } from "./../../../shared/models/habilitation";
import { UserGroupService } from "./../../../shared/services/api/user-group.service";
import { UserGroup } from "./../../../shared/models/user-group";
import { Component, OnInit } from "@angular/core";
import { MessageService, TreeNode } from "primeng/api";

@Component({
  selector: "app-group-habilitation",
  templateUrl: "./group-habilitation.component.html",
  styleUrls: ["./group-habilitation.component.scss"],
})
export class GroupHabilitationComponent implements OnInit {
  groupList: UserGroup[] = [];
  habilitationList: Habilitation[] = [];
  habilitionsTreeNodes: TreeNode[] = [];
  selectedHabilitations: TreeNode[] = [];
  dbGroupHabilitaionList: Habilitation[] = [];
  groupHabilitaionList: GroupHabilitation[] = [];

  selectedGroup: UserGroup;
  constructor(
    private userGroupService: UserGroupService,
    private habilitationService: HabilitationService,
    private groupHabilitationService: GroupHabilitationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userGroupService.findAll().subscribe((data) => {
      this.groupList = data;
    });

    this.habilitationService.findAll().subscribe((data) => {
      this.habilitationList = data;
      this.createhabilitationsTreeNodes(data);
    });
  }

  createhabilitationsTreeNodes(habilitations: Habilitation[]) {
    //let firstNode = { data: 'PARENT', parent: null};

    for (let hab of habilitations.sort((n1, n2) =>
      n1.code.localeCompare(n2.code)
    )) {
      if (!hab.habilitation && hab.active) {
        let parent = {
          key: hab.id.toString(),
          label: hab.code,
          data: hab,
          children: [],
        };

        hab.habilitations.forEach((element) => {
          parent.children.push({
            key: element.id.toString(),
            label: element.code,
            data: element,
          });
        });
        this.habilitionsTreeNodes.push(parent);
      }
    }
  }

onSelecteUserGroup(event) {
    this.selectedGroup = event.value[0];
    this.groupHabilitationService
      .find("userGroup.id:" + event.value[0].id)
      .subscribe((data) => {
        this.groupHabilitaionList = data;
        this.dbGroupHabilitaionList = data.map((gh) => gh.habilitation);
        console.log(this.dbGroupHabilitaionList);
        this.selecthabilitationsTreeNodes();
      });
  }

  selecthabilitationsTreeNodes() {
    //let firstNode = { data: 'PARENT', parent: null};
    this.selectedHabilitations = [];
    for (let hab of this.dbGroupHabilitaionList) {
      if (hab.active) {
        console.log(hab);
        if (hab.habilitation == null) {
          let habilitation = {
            key: hab.id.toString(),
            label: hab.code,
            data: hab,

          };
          console.log(habilitation);
          this.selectedHabilitations.push(habilitation);
        } else {
          let habilitation = {
            key: hab.id.toString(),
            label: hab.code,
            data: hab,
            partialSelected: false,
            // parent: {
            //   key: hab.habilitation.id.toString(),
            //   label: hab.habilitation.code,
            //   data: hab.habilitation,
            //   partialSelected: true,
            // },
          };
          let parent= {
            key: hab.habilitation.id.toString(),
            label: hab.habilitation.code,
            data: hab.habilitation,
            partialSelected: true,
          };
          console.log(habilitation);
          this.selectedHabilitations.push(habilitation);

          const habili = this.selectedHabilitations.find(
            line => line.label === parent.label
          );
          if (habili == null) {
            this.selectedHabilitations.push(parent);
          }


         // this.selectedHabilitations.push(parent);
        }
      }
    }
    console.log(this.selectedHabilitations);

  }




  onSubmit() {
    if (this.selectedGroup) {
      if (this.groupHabilitaionList.length > 0) {
        this.groupHabilitationService
          .deleteAllByIds(this.groupHabilitaionList.map((m) => m.id))
          .subscribe(
            (data) => {
              console.log("deleted");
            },
            (err) => console.error("err deleted")
          );
      }
      this.saveSelectedGroupHabilitations();
    } else {
      this.messageService.add({
        severity: "info",
        summary: "Info",
        detail: "Selectionner Commande",
      });
    }
  }

  saveSelectedGroupHabilitations() {
    let userGroupHabilitations: GroupHabilitation[] = [];
    this.selectedHabilitations.forEach((element) => {
      let groupHabilitation = new GroupHabilitation();
      groupHabilitation.userGroup = this.selectedGroup;
      groupHabilitation.habilitation = element.data;
      userGroupHabilitations.push(groupHabilitation);
    });

    this.groupHabilitationService.saveAll(userGroupHabilitations).subscribe(
      (data) => {
        console.log();
        this.messageService.add({
          severity: "success",
          summary: "Edition",
          detail: "Elément Enregistré Avec Succès",
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  // usergroup.Habilitations = this.selectedHabilitations.datas
}
