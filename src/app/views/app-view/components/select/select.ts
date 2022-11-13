export interface Select{
    id: number;
    categorySelect: Category[];
}

export interface Category{
    nameCategory: string;
    option: Option[];
}

export interface Option{
    idOption: number;
    name: string;
}