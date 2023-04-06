import cls from "./Main.module.scss";

type Props = {
    extraClass?: string;
    children?: React.ReactNode;
};

export const Main = (props: Props) => {
    const { children, extraClass = "" } = props;
    return <main className={`${cls.main} ${extraClass}`}>{children}</main>;
};
