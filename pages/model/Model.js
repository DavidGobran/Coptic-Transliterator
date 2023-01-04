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
                // TODO: handle names

                /* ⲩ cases */
                // ⲩ follows ⲁ or ⲉ
                case ((item === 'ⲁ' || item === 'ⲉ') && next === 'ⲩ'):
                    res.push(vowels.get(item))
                    res.push('v')
                    return
                // ⲩ follows ⲟ
                case (item === 'ⲟ' && next === 'ⲩ'):
                    res.push('o')
                    res.push('u')
                    return
                // ⲩ is follows ⲁ or ⲉ or ⲟ
                case (item === 'ⲩ' && (prev === 'ⲁ' || prev === 'ⲉ' || prev === 'ⲟ')):
                    return
                /* consonant cases */
                // ⲅ makes g sound
                case (item === 'ⲅ' && next === 'ⲓ'):
                    res.push('g')
                    return
                // consecutive ⲅ
                case (item === 'ⲅ' && next === 'ⲅ'):
                    res.push('ng')
                    return
                case (item === 'ⲅ' && prev === 'ⲅ'):
                    return
                // ϫ makes g sound
                case (item === 'ϫ' && (next === 'ⲁ' || next === 'ⲟ' || next === 'ⲱ')):
                    res.push('g')
                    return
                // ⲃ at the end of word
                case (item === 'ⲃ' && (!consonants.has(next) && !vowels.has(next))):
                    res.push('b')
                    return
                // ⲭ makes sh sound
                case (item === 'ⲭ' && (next === 'ⲉ' || next === 'ⲏ')):
                    res.push('sh')
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
        return res.join('')
    }
}