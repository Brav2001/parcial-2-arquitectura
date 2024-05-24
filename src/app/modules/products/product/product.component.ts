import { Component, OnInit } from '@angular/core';
import { CardComponent } from '@app/shared/layout/card/card.component';
import { TableComponent } from '@app/shared/layout/table/table.component';
import {
  TableActions,
  TableColumn,
} from '@app/shared/layout/interfaces/table-actions';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductEditComponent } from '@app/modules/products/product-edit/product-edit.component';
import { LateralMenuComponent } from '@app/shared/layout/lateral-menu/lateral-menu.component';
import { ProductsService } from '../services/products.service';
import { AlertService } from '@app/core/services/alert.service';
import { LoadingService } from '@app/core/services/loading.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CardComponent,
    TableComponent,
    MatDialogModule,
    LateralMenuComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  buttonActionName: string = 'Agregar producto';

  constructor(
    private _dialog: MatDialog,
    private _product: ProductsService,
    private _alert: AlertService,
    private _loading: LoadingService
  ) {}

  ngOnInit() {
    this.getAllProduct();
  }

  tableActions: TableActions = {
    add: true,
    edit: true,
    delete: true,
  };

  columnsTable: TableColumn[] = [
    { name: 'Nombre', key: 'title', type: 'text' },
    { name: 'Precio', key: 'price', type: 'text' },
    { name: 'Descripción', key: 'description', type: 'text' },
    { name: 'Categoria', key: 'category', type: 'text' },
  ];

  tableData: any = [];

  addProduct(value: any) {
    this._dialog.open(ProductEditComponent, {});
  }

  getAllProduct() {
    this._loading.show();
    this._product.getAllProducts().subscribe({
      next: (data) => {
        this.tableData = data.map((item: any) => ({
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category.name,
          id: item.id,
        }));
        this._loading.hide();
      },
    });
  }

  editProduct(value: any) {
    console.log(value);
    const refDialog = this._dialog.open(ProductEditComponent, {
      data: value.id,
    });
    refDialog.afterClosed().subscribe((value) => {
      if (value) {
        this.getAllProduct();
      }
    });
  }

  deleteProduct(value: any) {
    this._loading.show();
    this.callAlert('eliminando producto', 'info');
    this._product.deleteProduct(value).subscribe({
      next: (data) => {
        this._loading.show();
        this.getAllProduct();
        this.callAlert('Producto Eliminado', 'success');
      },
    });
  }

  callAlert(message: any, type: any) {
    type == 'success' && this._alert.success(message);
    type == 'info' && this._alert.info(message);
  }
}
