// const cpf = '081.683.130-03'; /*it's important to work with cpf as a string because the first digit can be 0*/
// const cpf = '111.111.111-11'; /*cpf digits mustn't form a sequence*/

/*the cpf to be received here will be a string, don't forget it.*/
/*do not forget to integrate all functions to work together and let 'em fine after finishing the project*/
/*remember: there's no hoisting in arrow functions.*/

const input = document.querySelector('#cpf-input');

(function cpfValidation() {

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

        if (isSequence(cpfReceived)) return alert('CPF inválido!');

        const cpfRoot = getCpfRoot(cpfReceived);
        const checkD1 = getCheckDigit(cpfRoot);
        const checkD2 = getCheckDigit(cpfRoot + checkD1);
        const cpfToCompare = getCpfToCompare(cpfRoot, checkD1, checkD2);

        if (!(cpfReceived === cpfToCompare)) return alert('CPF inválido!');
        alert('CPF válido!');
    }

    const form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
    })

    document.addEventListener('keyup', e => {
        if (e.key === 'Enter') checkCpf(input.value);
    })
})();

(function cpfInput() {

    const cpfMask = () => {
        input.value = input.value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    const removeLastChar = () => {
        input.value = input.value.slice(0, -1);
    }

    const checkInput = () => {
        if (!input.value.slice(-1).match(/\d+/g)) { /*if the last character is not a digit, immediately remove it from the input*/
            removeLastChar();
        }

        if (input.value.length > 14) { /*if the last digit makes the cpfInput.value greater than 14 (11 digits + 4 specialChars), immediately remove it from the input*/
            removeLastChar();
        }
    }

    input.addEventListener('input', e => {
        checkInput();
    })
    input.addEventListener('keydown', e => {
        cpfMask();
    })
})();