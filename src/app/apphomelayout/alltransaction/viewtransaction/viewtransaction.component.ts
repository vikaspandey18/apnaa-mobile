import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransacState } from '../state/transac.state';
import { selectAllBookings } from '../state/transac.selectors';
import { TransacResponse } from 'src/app/models/transac.model';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AuthService } from 'src/app/authlayout/services/auth.service';

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.scss'],
})
export class ViewtransactionComponent implements OnInit {
  id!: string | null;
  transaction$!: Observable<TransacResponse | undefined>;
  promoterId: string = '';

  @ViewChild('voucherElement', { static: false }) voucherElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ transac: TransacState }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalStorage();
    this.promoterId = user?.id || '';

    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.transaction$ = this.store.select(selectAllBookings).pipe(
        map(bookings => bookings.find(booking => booking.id === this.id))
      );
    }
  }

  async downloadImage() {
    if (!this.voucherElement) return;
    
    // Using useCORS: true to allow rendering external images (like eventImage) which might otherwise fail
    const canvas = await html2canvas(this.voucherElement.nativeElement, { scale: 2, useCORS: true, allowTaint: true });
    const imageString = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = imageString;
    link.download = `Ticker_Image_${this.id}.png`;
    link.click();
  }

  async downloadPDF() {
    if (!this.voucherElement) return;

    // Using useCORS: true to allow rendering external images in PDF
    const canvas = await html2canvas(this.voucherElement.nativeElement, { scale: 2, useCORS: true, allowTaint: true });
    const imageString = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2] // scale 2 adjustment
    });

    pdf.addImage(imageString, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`Ticker_PDF_${this.id}.pdf`);
  }
}
