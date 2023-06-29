import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { RentingOrderItemsService } from 'src/app/renting/services/renting-items/renting-order-items.service';
import { CarService } from 'src/app/renting/services/car/car.service';
import { switchMap, map,tap } from 'rxjs';
import { AuthService } from 'src/app/iam/services/auth.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

resutl:any;
invoice:any ;
rentingOrderItems:any;
car:any;
user:any;
  constructor(private route:ActivatedRoute, private invoiceService:InvoiceService, private rentingOrderItemsService:RentingOrderItemsService,private carService:CarService, private authService:AuthService) { }

  ngOnInit() {
    this.getInvoiceById()
    const user:any = this.authService.getCurrentUser()
    this.user=user;
  }

  getInvoiceById() {
    const invoiceId = this.route.snapshot.paramMap.get('invoiceId');
    console.log(invoiceId);

    if (invoiceId !== null) {
      this.invoiceService.getAll().pipe(
        map(response => {
          return response.result.find((invoice: any) => invoice.id === parseInt(invoiceId, 10));
        }),
        tap(invoice => {
          this.invoice = invoice;
          console.log(invoice);
        }),
        switchMap(invoice => {
          return this.rentingOrderItemsService.getById(invoice.serviceId);
        }),
        tap(rentingOrderItems => {
          this.rentingOrderItems=rentingOrderItems;
          console.log(rentingOrderItems)
        }),
        switchMap(rentingOrderItems => {
          return this.carService.getById(rentingOrderItems.result.vehicleId);
        })
      ).subscribe(
        car => {
          this.car=car;
          console.log(car);
        },
        error => {
          console.error('Error al obtener los detalles del coche:', error);
        }
      );
    } else {
      console.error('Invoice ID is null.');
    }
  }


  downloadPDF() {
    let data = document.getElementById('contentToConvert');

    if(data) {
      html2canvas(data).then(canvas => {
        let imgWidth = 208;
        let pageHeight = 295;
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('RentCarAssist.pdf');
      });
    } else {
      console.error("No se puede encontrar el elemento con id 'contentToConvert'.");
    }
  }

}
