export const transliterateController = (model, setCopticText) => {
    // get input
    let input = document.getElementById('copticUnicode').value
    // convert to unicode
    let unicode = model.convert(input)
    document.getElementById('copticUnicode').value = unicode
    // transliterate unicode
    let output = model.transliterate(unicode)
    setCopticText(output)
}