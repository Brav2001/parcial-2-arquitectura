export interface TableActions {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export interface TableColumn {
  name: string;
  key: string;
  type: 'text' | 'status' | 'statusName' | 'statusIf' | 'dateTime' | 'textLogoFranchise' | 'currency' | 'requestType' | 'payments' | 'date' | 'portalType';
}
