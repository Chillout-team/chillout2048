import cls from "./Main.module.scss";

type Props = {
    extraClass?: string;
    children?: React.ReactNode;
};

export const Main = ({ children, extraClass = "" }: Props) => {
    return <main className={`${cls.main} ${extraClass}`}>{children}</main>;
};
