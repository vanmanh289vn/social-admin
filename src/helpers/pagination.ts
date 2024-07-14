export interface IPagination<T> {
    totalItems: number;
    totalPage: number;
    pageSize: number;
    items: T[];
}