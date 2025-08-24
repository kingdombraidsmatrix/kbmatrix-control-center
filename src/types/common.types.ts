export interface Page<TData> {
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  content: Array<TData>;
}
