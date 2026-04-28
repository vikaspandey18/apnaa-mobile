import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { PromoterModel } from 'src/app/models/promoter.model';
import {
  selectAllPromoter,
  selectPromoterError,
  selectPromoterLoading,
} from './state/promoter.selectors';
import { loadPromoterStartAction } from './state/promoter.actions';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromoterService } from './services/promoter.service';
import { getAuthCreditAmt } from 'src/app/authlayout/state/auth.selectors';
import { maxCreditValidator } from 'src/app/validators/max-credit';

@Component({
  selector: 'app-subpromoters',
  templateUrl: './subpromoters.component.html',
  styleUrls: ['./subpromoters.component.scss'],
})
export class SubpromotersComponent implements OnInit {
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private promoterService: PromoterService,
  ) {}

  allPromoters$!: Observable<PromoterModel[] | []>;
  loading$!: Observable<boolean>;
  error$: Observable<string | null>;

  private searchTerm$ = new BehaviorSubject<string>('');
  filteredPromoters$!: Observable<PromoterModel[] | []>;

  selectedPromoter: PromoterModel | null = null;
  balanceForm!: FormGroup;

  creditAmt!: Observable<number>;
  creditValue = 0;

  private modalInstance: any;

  modalLoading = false;
  modalError: string | null = null;
  modalSuccess: string | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadPromoterStartAction());

    this.allPromoters$ = this.store.select(selectAllPromoter);
    this.loading$ = this.store.select(selectPromoterLoading);
    this.error$ = this.store.select(selectPromoterError);

    this.initForm();

    this.creditAmt = this.store.select(getAuthCreditAmt);

    this.creditAmt.subscribe((value) => {
      this.creditValue = value;

      // re-run validation when value updates
      this.balanceForm?.get('amount')?.updateValueAndValidity();
    });

    // combine search term with promoters list
    this.filteredPromoters$ = combineLatest([
      this.allPromoters$,
      this.searchTerm$,
    ]).pipe(
      map(([promoters, term]) =>
        promoters.filter((p) => {
          const name = p?.name?.toLowerCase() || '';
          const mobile = p?.mobile?.toLowerCase() || '';
          const search = term.toLowerCase();

          return name.includes(search) || mobile.includes(search);
        }),
      ),
    );
  }

  initForm() {
    this.balanceForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          maxCreditValidator(() => this.creditValue),
        ],
      ],
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm$.next(input.value);
  }

  openModal(promoter: PromoterModel): void {
    this.selectedPromoter = promoter;
    this.balanceForm.reset();

    const modalEl = document.getElementById('addBalanceModal');
    this.modalInstance = new bootstrap.Modal(modalEl);
    this.modalInstance.show();

    this.modalError = null;
    this.modalSuccess = null;
  }

  closeModal() {
    this.modalInstance?.hide();
  }

  submit(): void {
    if (this.balanceForm.invalid || !this.selectedPromoter) return;

    this.modalLoading = true;

    const amount = this.balanceForm.value.amount;
    const promoterId = this.selectedPromoter.id;

    if (promoterId && amount) {
      this.promoterService.addBalance(promoterId, amount).subscribe({
        next: (response) => {
          this.modalSuccess = response.message;
        },
        error: (err) => {
          this.modalError =
            err?.error?.message || 'An error occurred while adding balance.';
        },
        complete: () => {
          this.modalLoading = false;
        },
      });

      // this.closeModal();
    }
  }

  
}
