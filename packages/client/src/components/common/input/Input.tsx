import { useField } from "formik";
 
interface IInput {
    id: string;
    value: string;
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

    return (
        <div className={containerClassName}>
            <input
                className={inputClassName}
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

            {form?.errors[id] && (
                <label className={errorClassName}>{form.errors[id]}</label>
            )}
        </div>
    );
};
