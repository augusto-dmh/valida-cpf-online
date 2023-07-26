// const cpf = '081.683.130-03'; /*it's important to work with cpf as a string because the first digit can be 0*/
// const cpf = '111.111.111-11'; /*cpf digits mustn't form a sequence*/

/*the cpf to be received here will be a string, don't forget it.*/
/*do not forget to integrate all functions to work together and let 'em fine after finishing the project*/
/*remember: there's no hoisting in arrow functions.*/
function cpf(cpfUnformatted) {

    /*get cpf without "." and "-"*/
    const formatCpf = () => {
        let formattedCpf = cpfUnformatted.replace(/\D+/g, '');
        return formattedCpf;
    }

    const getCpfNumber = formattedCpf => {
        return Number(formattedCpf);
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

    const getCpfSum = cpf => {
        cpf = getCpfNumber(cpf);
        return Array.from(cpf).reduce((acc, digit => {
            return acc + digit;
        }));
    }

    const getCheckDigit = cpf => {
        const regressiveCounter = getRegressiveCounter(cpf);
        const cpfSum = getCpfSum(cpf);
        return 11 - cpfSum % 11;
    }

    const getCpfToCompare = (cpfRoot, ...checkDigits) => {
        const [checkD1, checkD2] = checkDigits;
        return cpfRoot + checkD1 + checkD2;
    }

    const isSequence = cpf => {
        return cpf === cpf[0].repeat(11);
    }

    const checkCpf = (cpfReceived, cpfToCompare) => {
        if (isSequence(cpfReceived)) return false;
        return cpfReceived === cpfToCompare;
    }
}