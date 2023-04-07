import { FC, TextareaHTMLAttributes } from "react";
import cls from "./TextArea.module.scss";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    errorText: string;
}

/** Компонент поля ввода текста. */
export const TextArea: FC<ITextAreaProps> = (props): JSX.Element => {
    const { placeholder, errorText, value, ...otherProps } = props;

    return (
        <>
            <textarea
                {...otherProps}
                className={cls.textArea}
                placeholder={placeholder}
                value={value}
            />
            {errorText && (
                <span className={cls.errorTextArea}>{errorText}</span>
            )}
        </>
    );
};
