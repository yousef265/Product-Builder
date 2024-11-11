export const productValidation = (product: { title: string; description: string; price: string; imageURL: string }) => {
    const errors = {
        title: "",
        price: "",
        description: "",
        imageURL: "",
    };

    const urlValidation = /^(http|https|ftp):\/\/([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 10 || product.title.length < 80) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }

    if (!product.description.trim() || product.description.length < 10 || product.description.length < 900) {
        errors.description = "Product description must be between 10 and 900 characters!";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price is required!";
    }
    if (!product.imageURL.trim() || !urlValidation) {
        errors.imageURL = "Valid image URL is required";
    }

    return errors;
};
