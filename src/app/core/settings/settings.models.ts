export interface Settings {
    selectedPageSize?: number;
    currency?: 'EUR' | 'USD';
    productColumnSettings?: ColumnSettings[];
    companyColumnSettings?: ColumnSettings[];
}

export interface ColumnSettings {
    name: string;
    visible: boolean
}