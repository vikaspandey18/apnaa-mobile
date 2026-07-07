import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  reportUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://apnaaentry.vizitlog.com/report-ui.php',
    );
  }

  ngOnInit(): void {
    window.location.href =
    'https://apnaaentry.vizitlog.com/report-ui.php';
  }
}
