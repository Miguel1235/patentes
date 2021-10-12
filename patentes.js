const nextLetter = letter => {
    let unicodeChar = letter.charCodeAt(0);
    return unicodeChar === 90 ? 'A' : String.fromCharCode(unicodeChar += 1);
};

const nextNumber = number => number === 9 ? 0 : Number(number += 1);

const isLetter = letter => (/[A-Z]/).test(letter);

const checkValidPatente = patente => {
    const newPatentRegex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/;
    const oldPatentRegex = /^[A-Z]{3}[0-9]{3}$/;
    return newPatentRegex.test(patente) || oldPatentRegex.test(patente);
};

const checkLastPatente = patente => {
    const newPatentRegex = /^Z{2}9{3}Z{2}$/;
    const oldPatentRegex = /^Z{3}9{3}$/;
    return newPatentRegex.test(patente) || oldPatentRegex.test(patente);
};

/**
 * Devuelve la próxima patente
 * @param {string} patente
 * @returns {string}
 */
const nextPatente = patente => {
    const patenteSplit = patente.split('');
    let position = patenteSplit.length - 1;
    let nextChar;
    let currentChar;

    while (true) {
        currentChar = patenteSplit[position];
        if (isLetter(currentChar))
            nextChar = nextLetter(currentChar);
        else
            nextChar = nextNumber(Number(currentChar));

        patenteSplit[position] = nextChar;

        if (nextChar === "A" || nextChar === 0)
            position--;
        else
            return patenteSplit.join('');
    };
};

/**
 * Devuelve las próximas k patentes
 * @param {string} patente
 * @param {number} k
 * @returns {string}
 */
const siguiente = (patente, k) => {
    if (!checkValidPatente(patente))
        return `El numero de patente ${patente} no es valido`;
    if (k < 0)
        return `El numero ${k} no es valido para calcular las patente siguientes`;
    while (k > 0) {
        if (checkLastPatente(patente))
            return patente;
        patente = nextPatente(patente);
        k--;
    }
    return patente;
};

// Patentes formato 1

console.log(siguiente('ABC151', 1));
console.log(siguiente('ZYZ999', 1));
console.log(siguiente('ERJ899', 20));
// console.log(siguiente('ZZZ999', 99));
// console.log(siguiente('AAA000', 15000000));

// Patentes formato 2

console.log(siguiente('TE200AW', 1));
console.log(siguiente('AB999ZZ', 1));
console.log(siguiente('TE200AW', 13));
// console.log(siguiente('ZZ999XZ', 40));
// console.log(siguiente('AA002ZZ', 3));
// console.log(siguiente('AA000AA', 1987654));
// console.log(siguiente('AA000AA', 450000000));

// Patentes formato invalido
console.log(siguiente('TE200AWW', 1));
console.log(siguiente('AAA12', 1));