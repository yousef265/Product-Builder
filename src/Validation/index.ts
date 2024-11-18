/**
 * Validates the fields of a product object and returns an object containing error messages for each field.
 *
 * @function
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - A description of the product.
 * @param {string} product.price - The price of the product as a string (to allow for formatting checks).
 * @param {string} product.imageURL - The URL for the product image.
 * @param {Array.<string>} product.colors - An array of colors associated with the product.
 * @returns {Object} errors - An object containing error messages for each field that fails validation.
 * @returns {string} errors.title - Error message for the title field, or an empty string if valid.
 * @returns {string} errors.description - Error message for the description field, or an empty string if valid.
 * @returns {string} errors.price - Error message for the price field, or an empty string if valid.
 * @returns {string} errors.imageURL - Error message for the image URL field, or an empty string if valid.
 * @returns {string} errors.colors - Error message for the colors field, or an empty string if valid.
 *
 * @description
 * The function performs the following validations:
 * - Title: Must be non-empty and between 10 and 80 characters.
 * - Description: Must be non-empty and between 10 and 900 characters.
 * - Price: Must be non-empty and a valid number.
 * - Image URL: Must be a non-empty string and match a valid URL format (http, https, ftp).
 * - Colors: Must contain at least one color.
 */

export const productValidation = (product: { title: string; description: string; price: string; imageURL: string; colors: string[] }): object => {
    const errors = {
        title: "",
        price: "",
        description: "",
        imageURL: "",
        colors: "",
    };

    const urlValidation = /^(http|https|ftp):\/\/([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }

    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description must be between 10 and 900 characters!";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price is required!";
    }
    if (!product.imageURL.trim() || !urlValidation) {
        errors.imageURL = "Valid image URL is required";
    }

    if (product.colors.length === 0) {
        errors.colors = "Must select at least one color";
    }

    return errors;
};
