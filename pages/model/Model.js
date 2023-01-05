import { vowels, consonants } from "./Alphabet";

export default class Model {
    constructor() {
    }

    transliterate(text) {
        const original = text.split('')
        const lowercase = text.toLowerCase().split('')
        let res = []
        lowercase.forEach((item, index) => {
            const prev = lowercase[index - 1]
            const next = lowercase[index + 1]
            switch (true) {
                // ignore special characters
                case item === '̀':
                    return
                // add jenkim to consonant
                case (consonants.has(item) && next === '̀'):
                    res.push('e')
                    break
                // don't add jenkim to vowel
                case (vowels.has(item) && next === '̀'):
                    // lowercase[index + 1] = item
                    break    
                // TODO: handle names

                // TODO: handle ⲏⲓ

                /* ⲩ cases */
                // ⲩ follows ⲁ or ⲉ
                case ((item === 'ⲁ' || item === 'ⲉ') && next === 'ⲩ'):
                    original[index] === original[index].toUpperCase() ? res.push(vowels.get(item).toUpperCase()) : res.push(vowels.get(item))
                    res.push('v')
                    return
                // ⲩ follows ⲟ
                case (item === 'ⲟ' && next === 'ⲩ'):
                    original[index] === original[index].toUpperCase() ? res.push('O') : res.push('o')
                    res.push('u')
                    return
                // ⲩ is follows ⲁ or ⲉ or ⲟ
                case (item === 'ⲩ' && (prev === 'ⲁ' || prev === 'ⲉ' || prev === 'ⲟ')):
                    return
                /* consonant cases */
                // ⲅ makes g sound
                case (item === 'ⲅ' && next === 'ⲓ'):
                    original[index] === original[index].toUpperCase() ? res.push('G') : res.push('g')
                    return
                // consecutive ⲅ
                case (item === 'ⲅ' && next === 'ⲅ'):
                    res.push('ng')
                    return
                case (item === 'ⲅ' && prev === 'ⲅ'):
                    return
                // ϫ makes g sound
                case (item === 'ϫ' && (next === 'ⲁ' || next === 'ⲟ' || next === 'ⲱ')):
                    original[index] === original[index].toUpperCase() ? res.push('G') : res.push('g')
                    return
                // ⲃ at the end of word
                case (item === 'ⲃ' && (!consonants.has(next) && !vowels.has(next))):
                    res.push('b')
                    return
                // ⲭ makes sh sound
                case (item === 'ⲭ' && (next === 'ⲉ' || next === 'ⲏ')):
                    original[index] === original[index].toUpperCase() ? res.push('Sh') : res.push('sh')
                    return
                default:
                    console.log(item)
            }
            // preserve capitalization
            if (original[index] === original[index].toUpperCase())
                res.push(vowels.get(original[index]) || consonants.get(original[index]) || item)
            else
                res.push(vowels.get(item) || consonants.get(item) || item)
        });

        // TODO: add dashes for consecutive vowels
        res.forEach((item, index) => {
            const next = res[index + 1]
            if (item.match(/\p{Letter}/gu) && (item === next || (item === 'u' && next === 'o')
                                                                || (item === 'i' && next === 'e')
                                                                || (item === 'a' && next === 'e')))
                res[index] = item + '-'
        })
        return res.join('')
    }
}