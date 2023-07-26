// const cpf = '081.683.130-03'; /*it's important to work with cpf as a string because the first digit can be 0*/
// const cpf = '111.111.111-11'; /*cpf digits mustn't form a sequence*/

/*the cpf to be received here will be a string, don't forget it.*/
/*do not forget to integrate all functions to work together and let 'em fine after finishing the project*/
/*remember: there's no hoisting in arrow functions.*/

/*get cpf without "." and "-"*/
const formatCpf = cpf => {
    let formattedCpf = cpf.replace(/\D+/g, '');
    return formattedCpf;
}

/*root = first nine digits*/
const getCpfRoot = cpf => {
    return cpf.slice(0, -2);
}

/*function to get the counter that's gonna be used to get the sum of all root digits - it'll be used to get a check digit*/
const getRegressiveCounter = cpf => {
    if (cpf.length > 9) return 11; /*if the first checkDigit is already on the cpf passed as argument*/
    return 10;
}

const getCpfSum = (cpf, regressiveCounter) => {
    return Array.from(cpf).reduce((acc, digit) => {
        digit = Number(digit);
        acc += regressiveCounter * digit;
        regressiveCounter--;
        return acc;
    }, 0);
}

const getCheckDigit = cpf => {
    const regressiveCounter = getRegressiveCounter(cpf); /*it isn't being used anywhere!*/
    const cpfSum = getCpfSum(cpf, regressiveCounter);
    const checkDigit = 11 - cpfSum % 11;
    if (checkDigit > 9) return 0;
    return checkDigit;
}

const getCpfToCompare = (cpfRoot, ...checkDigits) => {
    const [checkD1, checkD2] = checkDigits;
    return cpfRoot + checkD1 + checkD2;
}

const isSequence = cpf => {
    return cpf === cpf[0].repeat(11);
}

const checkCpf = cpfReceived => {
    cpfReceived = formatCpf(cpfReceived);

    if (isSequence(cpfReceived)) return false;

    const cpfRoot = getCpfRoot(cpfReceived);
    const checkD1 = getCheckDigit(cpfRoot);
    const checkD2 = getCheckDigit(cpfRoot + checkD1);
    const cpfToCompare = getCpfToCompare(cpfRoot, checkD1, checkD2);

    return cpfReceived === cpfToCompare;
}

const cpf = '081.683.130-03';
console.log(checkCpf(cpf));