import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PromoterModel } from 'src/app/models/promoter.model';

import {
  selectAllPromoter,
  selectPromoterError,
  selectPromoterLoading,
} from './state/promoter.selectors';

import { loadPromoterStartAction } from './state/promoter.actions';

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

  /* SEARCH */

  private searchTerm$ = new BehaviorSubject<string>('');

  /* OBSERVABLES */

  allPromoters$!: Observable<PromoterModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  filteredPromoters$!: Observable<PromoterModel[] | []>;

  /* SELECTED PROMOTER */

  selectedPromoter: PromoterModel | null = null;

  /* CREDIT */

  creditAmt!: Observable<number>;
  creditValue = 0;

  /* ADD BALANCE */

  addBalanceForm!: FormGroup;

  addLoading = false;
  addError: string | null = null;
  addSuccess: string | null = null;

  private addModalInstance: any;

  /* DEDUCT BALANCE */

  deductBalanceForm!: FormGroup;

  deductLoading = false;
  deductError: string | null = null;
  deductSuccess: string | null = null;

  private deductModalInstance: any;

  ngOnInit(): void {
    this.store.dispatch(loadPromoterStartAction());

    this.allPromoters$ = this.store.select(selectAllPromoter);

    this.loading$ = this.store.select(selectPromoterLoading);

    this.error$ = this.store.select(selectPromoterError);

    this.initForm();

    this.creditAmt = this.store.select(getAuthCreditAmt);

    this.creditAmt.subscribe((value) => {
      this.creditValue = value;

      // Re-run validator
      this.addBalanceForm?.get('amount')?.updateValueAndValidity();
    });

    /* FILTER PROMOTERS */

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

  /* INIT FORMS */

  initForm(): void {
    // ADD BALANCE FORM
    this.addBalanceForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          maxCreditValidator(() => this.creditValue),
        ],
      ],
    });

    // DEDUCT BALANCE FORM
    this.deductBalanceForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  /* SEARCH */

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.searchTerm$.next(input.value);
  }

  /* OPEN ADD MODAL */

  openAddModal(promoter: PromoterModel): void {
    this.selectedPromoter = promoter;

    this.addBalanceForm.reset();

    this.addError = null;
    this.addSuccess = null;

    const modalEl = document.getElementById('addBalanceModal');

    this.addModalInstance = new bootstrap.Modal(modalEl);

    this.addModalInstance.show();
  }

  /* OPEN DEDUCT MODAL */

  openDeductModal(promoter: PromoterModel): void {
    this.selectedPromoter = promoter;

    this.deductBalanceForm.reset();

    this.deductError = null;
    this.deductSuccess = null;

    const modalEl = document.getElementById('deductBalanceModal');

    this.deductModalInstance = new bootstrap.Modal(modalEl);

    this.deductModalInstance.show();
  }

  /* CLOSE MODALS */

  closeAddModal(): void {
    this.addModalInstance?.hide();
  }

  closeDeductModal(): void {
    this.deductModalInstance?.hide();
  }

  /* SUBMIT ADD BALANCE */

  submitAddBalance(): void {
    if (
      this.addBalanceForm.invalid ||
      !this.selectedPromoter ||
      !this.selectedPromoter.id
    ) {
      return;
    }

    this.addLoading = true;

    const amount = this.addBalanceForm.value.amount;

    const promoterId = this.selectedPromoter.id;

    this.promoterService.addBalance(promoterId, amount).subscribe({
      next: (response) => {
        this.addSuccess = response.message;
      },

      error: (err) => {
        this.addError =
          err?.error?.message || 'An error occurred while adding balance.';
      },

      complete: () => {
        this.addLoading = false;
      },
    });
  }

  /* SUBMIT DEDUCT BALANCE */

  submitDeductBalance(): void {
    if (
      this.deductBalanceForm.invalid ||
      !this.selectedPromoter ||
      !this.selectedPromoter.id
    ) {
      return;
    }

    this.deductLoading = true;

    const amount = this.deductBalanceForm.value.amount;

    const promoterId = this.selectedPromoter.id;

    this.promoterService.deductBalance(promoterId, amount).subscribe({
      next: (response) => {
        this.deductSuccess = response.message;
      },

      error: (err) => {
        this.deductError =
          err?.error?.message || 'An error occurred while deducting balance.';
      },

      complete: () => {
        this.deductLoading = false;
      },
    });
  }
}
