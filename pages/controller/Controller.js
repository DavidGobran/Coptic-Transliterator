export const convertController = (model, setCopticUnicode) => {
    let input = document.getElementById('copticFont').value
    let output = model.convert(input)
    setCopticUnicode(output)
}

export const transliterateController = (model, setCopticText) => {
    let input = document.getElementById('copticUnicode').value
    let output = model.transliterate(input)
    setCopticText(output)
}