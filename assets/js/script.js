// const cpf = '081.683.130-03'; /*it's important to work with cpf as a string because the first digit can be 0*/
// const cpf = '111.111.111-11'; /*cpf digits mustn't form a sequence*/

/*the cpf to be received here will be a string, don't forget it.*/
/*do not forget to integrate all functions to work together and let 'em fine after finishing the project*/
/*remember: there's no hoisting in arrow functions.*/

const input = document.querySelector('#cpf-input');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
});

(function cpfValidation() {

    // SHOW CPF VALIDATION RESULT //
    const containsAnyClass = (element, classList) => classList.some(className => element.classList.contains(className));

    const toggleValidationMsg = isValid => {
        const heroSection = document.querySelector('.hero-section');
        const validationResultContainer = document.querySelector('.validation-result');
        const validationResultMsg = document.querySelector('.validation-result__msg');

        if (containsAnyClass(validationResultContainer, ['valid', 'invalid'])) { /*if the container is already shown, then hide it*/
            heroSection.classList.remove('blur');
            validationResultContainer.classList.remove('valid');
            validationResultContainer.classList.remove('invalid');
            return;
        }

        heroSection.classList.toggle('blur');
        validationResultMsg.innerText = isValid ? 'CPF válido' : 'CPF inválido';
        if (!isValid) return validationResultContainer.classList.toggle('invalid'); /*return to stop the function's execution - gives the same result as writing on the next line*/
        validationResultContainer.classList.toggle('valid');
    }

    const validationResultBtn = document.querySelector('.validation-result__btn');
    validationResultBtn.addEventListener('click', toggleValidationMsg); /*hide validation msg whenever the button is clicked*/


    // CPF VALIDATION //
    const formatCpf = cpf => {
        return cpf.replace(/\D+/g, ''); /*get cpf without "." and "-"*/
    }

    const getCpfRoot = cpf => {
        return cpf.slice(0, -2); /*root = first nine digits*/
    }

    const getCpfSum = (cpf) => {
        let regressiveCounter = cpf.length + 1;

        return Array.from(cpf).reduce((acc, digit) => {
            digit = Number(digit);
            acc += regressiveCounter * digit;
            regressiveCounter--;
            return acc;
        }, 0);
    }

    const getCheckDigit = cpf => {
        const cpfSum = getCpfSum(cpf);
        const checkDigit = 11 - cpfSum % 11;

        if (checkDigit > 9) return 0;
        return checkDigit;
    }

    const getCpfToCompare = (cpf) => {
        const cpfRoot = getCpfRoot(cpf);
        const checkD1 = getCheckDigit(cpfRoot);
        const checkD2 = getCheckDigit(cpfRoot + checkD1);

        return cpfRoot + checkD1 + checkD2;
    }

    const isSequence = cpf => {
        return cpf === cpf[0].repeat(11);
    }

    const checkCpf = cpfReceived => {
        cpfReceived = formatCpf(cpfReceived);
        const cpfToCompare = getCpfToCompare(cpfReceived);

        if (isSequence(cpfReceived)) return toggleValidationMsg(false);

        toggleValidationMsg(cpfReceived === cpfToCompare);
    }

    document.addEventListener('keyup', e => {
        if (e.key === 'Enter') checkCpf(input.value);
    });
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

    input.addEventListener('input', checkInput);
    input.addEventListener('keydown', cpfMask);
})();