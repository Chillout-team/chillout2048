import cls from "./Main.module.scss";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";

type Props = {
    extraClass?: string;
    children?: React.ReactNode;
};

export const Main = ({ children, extraClass = "" }: Props) => {
    return <ErrorBoundary>
        <main className={`${cls.main} ${extraClass}`}>
            {children}
        </main>
    </ErrorBoundary>;
};
