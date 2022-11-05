export interface IGroup {
    id: string;
    name: string;
    description: string;
    imageLinks: string[];
}

export interface ICategory {
    id: string;
    name: string;
}

export interface IProduct {
    id: string;
    name: string;
    groupId: string;
    productCategoryId: string;
    imageLinks: string[];
    description: string;
    sizePrices: {
        sizeId: number;
        price: {
            currentPrice: number;
        };
    }[];
}

export interface ISize {
    id: string;
    name: string;
    priority: number;
}
