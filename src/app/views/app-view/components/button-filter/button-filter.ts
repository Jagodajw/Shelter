export type ButtonFilterDefaultID = number;
export interface ButtonFilter<TId = ButtonFilterDefaultID> {
  id: TId;
  name: string;
}
