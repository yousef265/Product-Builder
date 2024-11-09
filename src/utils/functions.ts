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
