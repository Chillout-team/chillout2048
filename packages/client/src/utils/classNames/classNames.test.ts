import { classNames } from "@/utils/classNames/classNames";

describe("classNames", () => {
    test("with only first param", () => {
        expect(classNames("class")).toBe("class");
    });

    test("with added class", () => {
        const expected = "class newClass newClass2";

        expect(classNames("class", {}, ["newClass", "newClass2"])).toBe(
            expected,
        );
    });

    test("with mods true", () => {
        const expected = "class active";

        expect(classNames("class", { active: true }, [])).toBe(expected);
    });

    test("with mods false", () => {
        const expected = "class";

        expect(classNames("class", { active: false }, [])).toBe(expected);
    });

    test("with mods undefined", () => {
        const expected = "class";

        expect(classNames("class", { active: undefined }, [])).toBe(expected);
    });

    test("with class and mods", () => {
        const expected = "class newClass newClass2 active";

        expect(
            classNames("class", { active: true }, ["newClass", "newClass2"]),
        ).toBe(expected);
    });
});
