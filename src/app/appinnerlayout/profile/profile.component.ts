import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { updateUserStartAction } from 'src/app/authlayout/state/auth.actions';
import {
  getAuthErrorState,
  getAuthLoadingState,
  getAuthMobileState,
  getAuthNameState,
  getAuthState,
} from 'src/app/authlayout/state/auth.selectors';
import { AuthResponse } from 'src/app/models/auth-response';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper/core';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private store: Store) {}

  username$!: Observable<string | null>;
  mobile$!: Observable<string | null>;
  auth$!: Observable<AuthResponse | null>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  isSubmitted!: boolean;

  profileForm!: FormGroup;

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  ngOnInit(): void {
    this.auth$ = this.store.select(getAuthState);

    this.username$ = this.store.select(getAuthNameState);
    this.mobile$ = this.store.select(getAuthMobileState);

    this.loading$ = this.store.select(getAuthLoadingState);
    this.error$ = this.store.select(getAuthErrorState);

    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl(
        { value: '', disabled: true },
        Validators.required,
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.auth$.pipe(take(1)).subscribe((authData) => {
      if (authData) {
        this.profileForm.patchValue({
          name: authData.name,
          mobile: authData.mobile,
          email: authData.email,
        });
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.getRawValue();

      const formData = new FormData();

      formData.append('id', formValue.id || '');
      formData.append('name', formValue.name || '');
      formData.append('mobile', formValue.mobile || '');
      formData.append('email', formValue.email || '');

      // 🔥 append file
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      // 🔥 dispatch action
      this.store.dispatch(updateUserStartAction({ formData }));
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}
