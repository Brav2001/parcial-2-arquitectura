import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageErrorsDirective } from '@app/shared/directives/field-errors/directive/message-errors.directive';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertService } from '@app/core/services/alert.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    MessageErrorsDirective,
    ReactiveFormsModule,
    RouterLink,
    NgSelectModule,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  screen: number = 1;
  images: string[] = [];

  category = [];

  constructor(
    private _alert: AlertService,
    private _product: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialog: MatDialogRef<ProductEditComponent>
  ) {}

  setDataProduct(data: any) {
    this.productForm.get('title')?.setValue(data['title']);
    this.productForm.get('price')?.setValue(data['price']);
    this.productForm.get('description')?.setValue(data['description']);
    this.productForm.get('categoryId')?.setValue(data['category']['id']);
  }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    if (this.data) {
      this.getProductById(this.data);
    }
  }
  getProductById(id: any) {
    this._product.getProductById(id).subscribe({
      next: (data) => {
        this.setDataProduct(data);
        if (data.images[0].startsWith('["')) {
          this.images = JSON.parse(data.images);
        } else {
          this.images = data.images;
        }
      },
      error: () => {
        this._alert.error('Al parecer ya borraron el producto. :((');
      },
    });
  }

  initForm(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(3),
      ]),
      price: new FormControl('', [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      images: new FormControl(''),
    });
  }

  // https://cdn.pixabay.com/photo/2024/02/26/19/39/monochrome-image-8598798_640.jpg
  pushImage() {
    const img = this.productForm.get('images')?.value;
    if (this.imageURLValidator({ value: img } as FormControl) === null) {
      this.productForm.get('images')?.setValue('');
      this.images.push(img);
    } else {
      this.productForm.get('images')?.setValue('');
      this._alert.error('Url no valida');
    }
  }

  deleteImage(position: number) {
    this.images.splice(position, 1);
    this._alert.success('Producto eliminado');
  }

  imageURLValidator(control: FormControl): { [key: string]: boolean } | null {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?.(jpg|jpeg|png|gif|bmp)$/i;
    if (!control.value || !urlPattern.test(control.value)) {
      return { invalidImageUrl: true };
    }
    return null;
  }

  getCategories() {
    this._product.getCategories().subscribe({
      next: (data: any) => {
        this.category = data;
      },
    });
  }

  changeScreen(screen: number) {
    if (this.productForm.valid) {
      this.screen = screen;
    } else {
      this.productForm.markAllAsTouched();
      this._alert.warning('Debes completar todos los campos');
    }
  }

  sendDataRegisterProduct() {
    if (this.productForm.valid && this.images.length > 0) {
      const dataProduct: any = {
        title: this.productForm.get('title')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value,
        categoryId: this.productForm.get('categoryId')?.value,
        images: this.images,
      };

      const petition: Observable<any> = this.data
        ? this._product.updateProduct(this.data, dataProduct)
        : this._product.saveProduct(dataProduct);

      petition.subscribe({
        next: () => {
          this.productForm.reset();
          this.images = [];
          this.data
            ? this._alert.success('Producto actualizado exitosamente')
            : this._alert.success('Producto registrado exitosamente');
          this._dialog.close(true);
          this._product.getAllProducts();
        },
        error: () => {
          this.data
            ? this._alert.error('Hubo un problema al actualizar el producto.')
            : this._alert.error('Hubo un problema al registrar el producto.');
        },
      });
    } else {
      this._alert.warning('Debes agregar mínimo una imagen');
    }
  }
}
