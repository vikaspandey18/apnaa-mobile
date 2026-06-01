import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TransacResponse } from 'src/app/models/transac.model';
import { TransacState } from '../state/transac.state';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/authlayout/services/auth.service';
import { map } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { selectAllBookings } from '../state/transac.selectors';

@Component({
  selector: 'app-clientviewtransaction',
  templateUrl: './clientviewtransaction.component.html',
  styleUrls: ['./clientviewtransaction.component.scss'],
})
export class ClientviewtransactionComponent implements OnInit {
  id!: string | null;
  transaction$!: Observable<TransacResponse | undefined>;
  promoterId: string = '';

  @ViewChild('voucherElement', { static: false }) voucherElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ transac: TransacState }>,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalStorage();
    this.promoterId = user?.id || '';

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.transaction$ = this.store
        .select(selectAllBookings)
        .pipe(
          map((bookings) => bookings.find((booking) => booking.id === this.id)),
        );
    }
  }

  async downloadImage() {
    if (!this.voucherElement) return;

    // Using useCORS: true to allow rendering external images (like eventImage) which might otherwise fail
    const canvas = await html2canvas(this.voucherElement.nativeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imageString = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageString;
    link.download = `Ticker_Image_${this.id}.png`;
    link.click();
  }

  async downloadPDF() {
    if (!this.voucherElement) return;

    // Using useCORS: true to allow rendering external images in PDF
    const canvas = await html2canvas(this.voucherElement.nativeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    const imageString = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2], // scale 2 adjustment
    });

    pdf.addImage(imageString, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`Ticker_PDF_${this.id}.pdf`);
  }
}
