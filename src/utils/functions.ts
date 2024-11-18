/**
 * Truncates a given text to a specified maximum length and appends an ellipsis (`...`)
 * if the text exceeds that length. If the text is within the limit, it returns the text as-is.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} [maxLength=60] - The maximum length of the text before truncation. Default is 60.
 * @returns {string} - The truncated text with an ellipsis if it exceeds `maxLength`; otherwise, the original text.
 */

export function textSlicer(text: string, maxLength: number = 60): string {
    if (text.length > maxLength) return text.slice(0, maxLength) + "...";

    return text;
}

/**
 * Formats a number by adding commas as thousands separators.
 *
 * @param {number | string} price - The number or string to format with commas.
 * @returns {string} The formatted string with commas as thousands separators.
 */
export function numberWithCommas(price: number | string): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
