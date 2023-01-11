import Alphabet from "./Alphabet";
import {font, consonants, vowels} from "./Alphabet";

export default class Model {
    constructor() {
        let a = new Alphabet()
        a.initializeConvert()
        a.initializeTranslit()
    }

    convert(text) {
        const original = text.split('')
        const swapped = text.split('')
        let res = []
        // swap jenkim to after letter
        original.forEach((item, index) => {
            if (item === '`') {
                swapped[index] = original[index + 1]
                swapped[index + 1] = item
            }
        })
        swapped.forEach((item) => {
            res.push(font.get(item) || item)
        })
        return res.join('')
    }

    transliterate(text) {
        const original = text.split('')
        const lowercase = text.toLowerCase().split('')
        let res = []
        lowercase.forEach((item, index) => {
            const prev = lowercase[index - 1]
            const next = lowercase[index + 1]
            switch (true) {
                // ignore jenkim, already handled
                case item === '̀':
                    return
                // add jenkim to consonant
                case (consonants.has(item) && next === '̀'):
                    res.push('e')
                    break
                // don't add jenkim to vowel
                case (vowels.has(item) && next === '̀'):
                    break    
                // TODO: finish handling names
                case (item === 'ⲓ' && next === 'ⲱ'):
                    this.isUppercase(original[index]) ? res.push('Y') : res.push('y')
                    return
                /* special vowel cases */
                // TODO: ⲟⲓ case, requies Greek distinction
                // ⲏⲓ case
                case (item === 'ⲏ' && next === 'ⲓ'):
                    res.push('e')
                    return
                // ⲩ follows ⲁ or ⲉ
                case ((item === 'ⲁ' || item === 'ⲉ') && next === 'ⲩ'):
                    this.isUppercase(original[index]) ? res.push(vowels.get(item).toUpperCase()) : res.push(vowels.get(item))
                    res.push('v')
                    return
                // ⲩ follows ⲟ
                case (item === 'ⲟ' && next === 'ⲩ'):
                    this.isUppercase(original[index]) ? res.push('O') : res.push('o')
                    res.push('u')
                    return
                // ⲩ is follows ⲁ or ⲉ or ⲟ
                case (item === 'ⲩ' && (prev === 'ⲁ' || prev === 'ⲉ' || prev === 'ⲟ')):
                    return

                /* special consonant cases */
                // ⲅ makes g sound
                case (item === 'ⲅ' && (next === 'ⲓ' || next === 'ⲉ')):
                    this.isUppercase(original[index]) ? res.push('G') : res.push('g')
                    return
                // consecutive ⲅ
                case (item === 'ⲅ' && next === 'ⲅ'):
                    res.push('n')
                    return
                // ϫ makes g sound
                case (item === 'ϫ' && (next === 'ⲁ' || next === 'ⲟ' || next === 'ⲱ')):
                    this.isUppercase(original[index]) ? res.push('G') : res.push('g')
                    return
                // ⲃ at the end of word
                case (item === 'ⲃ' && (!consonants.has(next) && !vowels.has(next))):
                    res.push('b')
                    return
                // ⲭ makes sh sound
                case (item === 'ⲭ' && (next === 'ⲉ' || next === 'ⲏ')):
                    this.isUppercase(original[index]) ? res.push('Sh') : res.push('sh')
                    return
                default:
                    console.log(item)
            }
            // preserve capitalization
            if (this.isUppercase(original[index]))
                res.push(vowels.get(original[index]) || consonants.get(original[index]) || item)
            else
                res.push(vowels.get(item) || consonants.get(item) || item)
        });

        // add dashes for consecutive vowels
        res.forEach((item, index) => {
            const next = res[index + 1]
            if (item.match(/\p{Letter}/gu) && ((item === next && this.isVowel(item)) 
                                                || (item === 'u' && next === 'o')
                                                || (item === 'i' && next === 'e')
                                                || (item === 'a' && next === 'e')))
                res[index] = item + '-'
        })
        return res.join('')
    }

    /* helper functions */
    isVowel(char) {
        return char === 'a' || char === 'e' || char === 'i' || char === 'o' || char === 'u'
    }

    isUppercase(char) {
        return char === char.toUpperCase()
    }
}