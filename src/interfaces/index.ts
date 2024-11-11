export interface IProduct {
    id: string | undefined;
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string[];
    category: {
        name: string;
        imageURL: string;
    };
}

export interface IFormInput {
    name: "title" | "description" | "price" | "imageURL";
    label: string;
    type: string;
}
