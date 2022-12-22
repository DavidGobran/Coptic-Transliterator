
export const transliterateController = (model, setCopticText) => {
    let input = document.getElementById('copticText').value
    let output = model.transliterate(input)
    setCopticText(output)
}