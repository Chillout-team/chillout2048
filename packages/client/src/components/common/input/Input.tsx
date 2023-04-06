import { useField } from "formik";
import cls from "./input.module.scss"
 
export interface IInput {
    id: string;
    value?: string;
    name?: string;
    type?: "text" | "email" | "password";
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    labelText?: string;
    form?: TForm;
    placeholder?: string;
    disabled?: boolean;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

type TForm = {
    errors: Record<string, string>;
};

export const Input = (props: IInput) => {
    const {
        id,
        containerClassName,
        inputClassName,
        labelClassName,
        errorClassName,
        placeholder = " ",
        labelText,
        form,
        ...other
    } = props;
    const [field] = useField(id);

    const isError = !!form?.errors[id]

    return (
        <div className={containerClassName}>
            <input
                className={isError? `${inputClassName} ${cls.__error}` : inputClassName }
                {...field}
                {...other}
                placeholder={placeholder}
                name={id}
            />

            {labelText && (
                <label className={labelClassName} htmlFor={id}>
                    {labelText}
                </label>
            )}

            {isError && (
                <label className={errorClassName}>{form.errors[id]}</label>
            )}
        </div>
    );
};
