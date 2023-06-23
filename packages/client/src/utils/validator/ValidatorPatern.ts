const isLatinAlphabet = new RegExp(/[a-z]/i);
const isCyrillicAlphabet = new RegExp(/[а-я]/i);
const isFirstLetterIsUppercase = new RegExp(/^[A-ZА-Я]/);
const isCapitalLetter = new RegExp(/[A-ZА-Я]/g);
const isSpaces = new RegExp(/\s/g);
const isNumber = new RegExp(/[0-9]/g);
// eslint-disable-next-line no-useless-escape
const isSpecialCharacters = new RegExp(/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/g);
const isPhone = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g,
);
const isEmail = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i,
);

export {
    isLatinAlphabet,
    isCyrillicAlphabet,
    isFirstLetterIsUppercase,
    isCapitalLetter,
    isSpaces,
    isNumber,
    isSpecialCharacters,
    isPhone,
    isEmail,
};
