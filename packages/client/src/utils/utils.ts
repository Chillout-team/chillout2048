export const declensionByNumbers = (
    number: number,
    words: string[],
): string => {
    return words[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
    ];
};

type TSetCookieProps = Record<string, string | Date | number | boolean>;

export const setCookie = (
    name: string,
    value: string,
    props: TSetCookieProps = {},
): void => {
    let exp = props.expires;
    if (typeof exp === "number" && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }

    if (exp instanceof Date) props.expires = exp.toUTCString();

    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
    setCookie(name, "", { expires: 0 });
};
