import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  TableActions,
  TableColumn,
} from '@app/shared/layout/interfaces/table-actions';
import { TABLE_ACTIONS } from '@app/core/utils/consts';
import { GetterPropertyPipe } from '@app/shared/layout/pipes/getter-property.pipe';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [GetterPropertyPipe, NgForOf],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() action: TableActions = TABLE_ACTIONS;
  @Input() tableColumns: TableColumn[] = [];
  @Input() rowActionName: string = 'Opciones';
  @Input() buttonActionName: string = 'Agregar';
  @Input() tableData: any = [];

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  public displayedColumns: string[] = [];

  // ngOnInit(): void {
  //   const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
  //   if (this.rowActionName) {
  //     this.displayedColumns = [this.rowActionName, ...columnNames]
  //   } else {
  //     this.displayedColumns = columnNames;
  //   }

  addItem() {
    this.add.emit(true);
  }

  editItem(value: any): void {
    // console.log(value)
    this.edit.emit(value);
  }

  deleteItem(value: any): void {
    this.delete.emit(value);
  }
}
