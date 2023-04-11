import { SinginSchema, SingupSchema } from './Validator';

test('SinginSchema test', async () => {
    expect(
        await SinginSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe123?',
        }),
    ).toBe(true);
    expect(
        await SinginSchema.isValid({
            login: '432424234234',
            password: 'Qwwwwewewewe123?',
        }),
    ).toBe(false);
    expect(
        await SinginSchema.isValid({
            login: 'sadывывфы',
            password: 'Qwwwwewewewe123?',
        }),
    ).toBe(false);
    expect(
        await SinginSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe.',
        }),
    ).toBe(false);
});

test('SingupSchema test', async () => {
    expect(
        await SingupSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe123?',
            password_repeat: 'Qwwwwewewewe123?',
            email: 'practicum@pract.ru',
            first_name: 'Alex',
            second_name: 'Mercer',
            phone: '+79999999999',
        }),
    ).toBe(true);
    expect(
        await SingupSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe123?',
            password_repeat: 'Qwwwwewewewe',
            email: 'practicum@pract.ru',
            first_name: 'Alex',
            second_name: 'Mercer',
            phone: '+79999999999',
        }),
    ).toBe(false);
    expect(
        await SingupSchema.isValid({
            login: 'qazwsxZ',
            password: 'Qwwwwewewewe123?',
            password_repeat: 'Qwwwwewewewe123?',
            email: 'practicumpract.ru',
            first_name: 'Alex',
            second_name: 'Mercer',
            phone: '+79999999999',
        }),
    ).toBe(false);
    expect(
        await SingupSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe123?',
            password_repeat: 'Qwwwwewewewe123?',
            email: 'practicum@pract.ru',
            first_name: 'flex',
            second_name: 'Mercer',
            phone: '+79999999999',
        }),
    ).toBe(false);
    expect(
        await SingupSchema.isValid({
            login: 'qazwsx',
            password: 'Qwwwwewewewe123?',
            password_repeat: 'Qwwwwewewewe123?',
            email: 'practicum@pract.ru',
            first_name: 'Alex',
            second_name: 'Mercer',
            phone: '+79999999999s',
        }),
    ).toBe(false);
});
