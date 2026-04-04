import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewtransaction',
  templateUrl: './viewtransaction.component.html',
  styleUrls: ['./viewtransaction.component.scss'],
})
export class ViewtransactionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  id!: string | null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
