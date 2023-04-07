import cls from "./Button.module.scss";

interface IButton {
    onClick: (event: React.FormEvent) => void;
    size: "small" | "medium" | "big";
    color: "green" | "orange" | "red" | "yellow";
    type: "button" | "submit" | "reset";
    disabled?: boolean;
    children?: React.ReactNode;
}

export const Button = ({ size, color, children, ...other }: IButton) => {
    return (
        <button
            {...other}
            className={`${cls.button} ${cls[`__${size}`]} ${
                cls[`__${color}`]
            }`}>
            {children}
        </button>
    );
};
