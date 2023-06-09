import { Dispatch, FC, SetStateAction } from "react";
import cls from "./Modal.module.scss";

interface IPopup {
    title: string;
    active: boolean;
    children?: React.ReactNode;
    setActive: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<IPopup> = ({ title, active, setActive, children }) => {
    return (
        <div
            className={active ? `${cls.modal} ${cls.active}` : cls.modal}
            onClick={() => setActive(false)}>
            <div
                className={
                    active ? `${cls.content} ${cls.active}` : cls.content
                }
                onClick={e => e.stopPropagation()}>
                <h1 className={cls.title}>{title}</h1>
                {children}
            </div>
        </div>
    );
};
