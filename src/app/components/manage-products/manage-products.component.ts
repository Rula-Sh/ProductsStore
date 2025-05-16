import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-manage-products',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, I18nPipe],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss',
})
export class ManageProductsComponent {
  productForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user_role') !== 'Admin') {
      this.router.navigate(['/not-autherized']);
    } else {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        properties: ['', Validators.required],
        image: ['', Validators.required],
      });
    }
  }

  selectedFile!: File;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.error('No file selected.');
      return;
    }

    const file = input.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;

      this.productForm.patchValue({ image: base64Image });
    };
    reader.onerror = (err) => {
      console.error('FileReader error:', err);
    };

    reader.readAsDataURL(file);
  }

  addProduct() {
    const product: Product = this.productForm.value;
    this.productService.AddProduct(product).subscribe({
      next: () => {
        console.log('Product Added');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error Adding a Product', err);
      },
    });
  }
}
