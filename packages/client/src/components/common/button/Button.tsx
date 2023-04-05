import cls from "./Button.module.scss";

interface ButtonInterface
    extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
    onClick: (event: React.FormEvent) => void;
    size: "small" | "medium" | "big";
    color: "green" | "orange" | "red" | "yellow";
    type: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button = (props: ButtonInterface) => {
    const { size, color, children, ...other } = props;
    return (
        <button
            {...other}
            className={
                cls.button + " " + cls[`__${size}`] + " " + cls[`__${color}`]
            }>
            {children}
        </button>
    );
};
