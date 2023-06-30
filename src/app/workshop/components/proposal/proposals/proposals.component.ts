import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProposalService } from 'src/app/workshop/services/proposal/proposal.service';
import { WorkshopService } from 'src/app/workshop/services/workshop-s/workshop.service';
import { CreateProposalComponent } from '../create-proposal/create-proposal.component';
import { CreateServiceItemComponent } from '../create-service-item/create-service-item.component';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalsComponent implements OnInit {
  ref!: DynamicDialogRef;
  proposals!: any[];
  // proposals = [
  //   {
  //     id: 1,
  //     humanResources: 2,
  //   },
  // ];

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private proposalsService: ProposalService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getAllProposals();
  }

  getAllProposals() {
    this.proposalsService.getProposals().subscribe(
      (response: any) => {
        this.proposals = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createServiceItem(proposalId: any){
    let width = '60%';
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(CreateServiceItemComponent, {
      header: 'Create Service Item',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: { proposalId },
    });
  }

  createProposal() {
    let width = '60%';
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(CreateProposalComponent, {
      header: 'Create proposal',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }
}
