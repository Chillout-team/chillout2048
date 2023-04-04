import { useField } from 'formik';

export interface InputInterface
    extends Omit<React.HTMLProps<HTMLInputElement>, "size"> {
    id: string;
    value: string;
    type?: "text" | "email" | "password";
    containerClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    labelText?: string;
    placeholder?: string;
    disabled?: boolean;
    errorText?: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const Input = (props: InputInterface) => {
    const {
        id,
        containerClassName,
        inputClassName,
        labelClassName,
        errorClassName,
        placeholder = " ",
        labelText,
        errorText,
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

            {errorText && <label className={errorClassName}>{errorText}</label>}
        </div>
    );
};
