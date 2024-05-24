import {Component, ElementRef, ViewChild} from '@angular/core';
import {TableComponent} from "@app/shared/layout/table/table.component";
import {TableActions, TableColumn} from "@app/shared/layout/interfaces/table-actions";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild("graph") graphRef!: ElementRef;
  public graph: any;

  tableActions: TableActions = {
    add: true,
    edit: true,
    delete: false
  }

  columnsTable: TableColumn[] = [
    {name: 'Nombre', key: 'nombre', type: 'text'},
    {name: 'Codigo', key: 'codigo', type: 'text'},
    {name: 'Descripcion', key: 'descripcion', type: 'text'},
  ];

  tableData: any[] = [
    {nombre: 'Producto 1', codigo: 'ABC123', descripcion: 'Descripción del Producto 1'},
    {nombre: 'Producto 2', codigo: 'DEF456', descripcion: 'Descripción del Producto 2'},
    {nombre: 'Producto 3', codigo: 'GHI789', descripcion: 'Descripción del Producto 3'},
    {nombre: 'Producto 4', codigo: 'JKL012', descripcion: 'Descripción del Producto 4'},
    {nombre: 'Producto 5', codigo: 'MNO345', descripcion: 'Descripción del Producto 5'},
    {nombre: 'Producto 6', codigo: 'PQR678', descripcion: 'Descripción del Producto 6'},
    {nombre: 'Producto 7', codigo: 'STU901', descripcion: 'Descripción del Producto 7'},
    {nombre: 'Producto 8', codigo: 'VWX234', descripcion: 'Descripción del Producto 8'},
    {nombre: 'Producto 9', codigo: 'YZA567', descripcion: 'Descripción del Producto 9'},
    {nombre: 'Producto 10', descripcion: 'Descripción del Producto 10', codigo: 'BCD890'}
  ];

  createGraph() {

  }
}


