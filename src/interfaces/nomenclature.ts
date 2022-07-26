export interface ICategory {
    id: string;
    name: string;
}

export interface IProduct {
    id: string;
    name: string;
    productCategoryId: string;
    imageLinks: string[];
}
