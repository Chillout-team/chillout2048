import cls from "./Button.module.scss";

interface IButton {
    onClick?: (event: React.FormEvent) => void;
    size: "small" | "medium" | "big";
    color: "green" | "orange" | "red" | "yellow";
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    children?: React.ReactNode;
    subclass?: string;
}

export const Button = ({
    size,
    color,
    children,
    subclass = "",
    ...other
}: IButton) => {
    return (
        <button
            {...other}
            className={`${cls.button} ${cls[`__${size}`]} ${
                cls[`__${color}`]
            } ${subclass}`}>
            {children}
        </button>
    );
};
