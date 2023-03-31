export const isEmptyObject = <TData extends object>(data: TData): boolean =>
  data === null || Object.keys(data).length === 0;
