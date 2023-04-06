import * as yup from "yup";
import {
    isLatinAlphabet,
    isCyrillicAlphabet,
    isFirstLetterIsUppercase,
    isCapitalLetter,
    isSpaces,
    isNumber,
    isSpecialCharacters,
    isPhone,
    // isEmail,
} from "./ValidatorPatern";

export const SinginSchema = yup.object().shape({
    login: yup
        .string()
        .min(3)
        .max(20)
        .matches(isLatinAlphabet, "Только латинский алфавит")
        .test(
            "isNotCyrillic",
            "Только латинский алфавит",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
        )
        .required("Обязательно для заполнения"),
    password: yup
        .string()
        .min(8)
        .max(40)
        .matches(isLatinAlphabet, "Только латинский алфавит")
        .matches(isCapitalLetter, "Нет заглавных букв")
        .matches(isSpecialCharacters, "Нет спецсимволов")
        .matches(isNumber, "Нет цифр")
        .test(
            "isNotCyrillic",
            "Только латинский алфавит",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        )
        .required("Обязательно для заполнения"),
});

export const SingupSchema = yup.object().shape({
    login: yup
        .string()
        .min(3)
        .max(20)
        .matches(isLatinAlphabet, "Только латинский алфавит")
        .test(
            "isNotCyrillic",
            "Только латинский алфавит",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
        )
        .required("Обязательно для заполнения"),
    password: yup
        .string()
        .min(8)
        .max(40)
        .matches(isLatinAlphabet, "Только латинский алфавит")
        .matches(isCapitalLetter, "Нет заглавных букв")
        .matches(isSpecialCharacters, "Нет спецсимволов")
        .matches(isNumber, "Нет цифр")
        .test(
            "isNotCyrillic",
            "Только латинский алфавит",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        )
        .required("Обязательно для заполнения"),
    password_repeat: yup
        .string()
        .oneOf([yup.ref("password")], "Пароли не совпадают")
        .required("Обязательно для заполнения"),
    email: yup
        .string()
        .email()
        // .matches(isEmail, 'Текст ошибки')
        .typeError("Неверный формат почты")
        .required("Обязательно для заполнения"),
    first_name: yup
        .string()
        .matches(
            isFirstLetterIsUppercase,
            "Должен начинаться с заглавной буквы",
        )
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .test(
            "isNotNumber",
            "Использовать цифры запрещено",
            value => !isNumber.test(value as string),
        )
        .typeError(
            "В данное поле принимается: латиница или кириллица, первая буква должна быть заглавной, без пробелов. без цифр, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
    second_name: yup
        .string()
        .matches(
            isFirstLetterIsUppercase,
            "Должен начинаться с заглавной буквы",
        )
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .test(
            "isNotNumber",
            "Использовать цифры запрещено",
            value => !isNumber.test(value as string),
        )
        .typeError(
            "В данное поле принимается: латиница или кириллица, первая буква должна быть заглавной, без пробелов. без цифр, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
    phone: yup
        .string()
        .matches(isPhone, "Неверный формат номера")
        .test(
            "isNotNumber",
            "Неверный формат номера",
            value =>
                !isLatinAlphabet.test(value as string) &&
                !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
        )
        .required("Обязательно для заполнения"),
});

export const ProfileSchema = yup.object().shape({
    login: yup
        .string()
        .min(3)
        .max(20)
        .matches(isLatinAlphabet, "Текст ошибки")
        .test(
            "isNotCyrillic",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
    email: yup
        .string()
        .email()
        // .matches(isEmail, 'Текст ошибки')
        .typeError("Неверный формат почты")
        .required("Обязательно для заполнения"),
    first_name: yup
        .string()
        .matches(isFirstLetterIsUppercase, "Текст ошибки")
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .test("isNotNumber", value => !isNumber.test(value as string))
        .typeError(
            "В данное поле принимается: латиница или кириллица, первая буква должна быть заглавной, без пробелов. без цифр, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
    second_name: yup
        .string()
        .matches(isFirstLetterIsUppercase, "Текст ошибки")
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .test("isNotNumber", value => !isNumber.test(value as string))
        .typeError(
            "В данное поле принимается: латиница или кириллица, первая буква должна быть заглавной, без пробелов. без цифр, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
    phone: yup
        .string()
        .matches(isPhone, "Текст ошибки")
        .test(
            "isNotNumber",
            value =>
                !isLatinAlphabet.test(value as string) &&
                !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
        )
        .required("Обязательно для заполнения"),
    display_name: yup
        .string()
        .min(5)
        .max(20)
        .test(
            "isNotSpecialCharacters",
            "Использовать смецсимволы запрещено",
            value => !isSpecialCharacters.test(value as string),
        )
        .test(
            "isNotSpaces",
            "Использовать пробелы запрещено",
            value => !isSpaces.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 5 до 20 символов, латиница или кириллица, без пробелов, без спецсимволов",
        )
        .required("Обязательно для заполнения"),
});

export const NewPasswordSchema = yup.object().shape({
    old_password: yup
        .string()
        .min(8)
        .max(40)
        .matches(isLatinAlphabet, "Текст ошибки")
        .matches(isSpecialCharacters, "Текст ошибки")
        .matches(isNumber, "Текст ошибки")
        .test(
            "isNotCyrillic",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        )
        .required("Обязательно для заполнения"),
    new_password: yup
        .string()
        .min(8)
        .max(40)
        .matches(isLatinAlphabet, "Текст ошибки")
        .matches(isSpecialCharacters, "Текст ошибки")
        .matches(isNumber, "Текст ошибки")
        .test(
            "isNotCyrillic",
            value => !isCyrillicAlphabet.test(value as string),
        )
        .typeError(
            "В данное поле принимается: от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
        )
        .required("Обязательно для заполнения"),
    new_password_repeat: yup
        .string()
        .oneOf([yup.ref("new_password")], "Пароли не совпадают")
        .required("Обязательно для заполнения"),
});
