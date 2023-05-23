import React, { ButtonHTMLAttributes, FC } from "react";
import cls from "./IconButton.module.scss";
import { Size } from "./types";
import { classNames } from "@/utils/classNames/classNames";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    size?: Size;
}

export const IconButton: FC<IProps> = ({
    className = "",
    children,
    size = "small",
    ...othersProps
}) => {
    return (
        <button
            type="button"
            className={classNames(
                cls.root,
                {
                    [cls.small]: size === "small",
                    [cls.large]: size === "large",
                },
                [className],
            )}
            {...othersProps}>
            {children}
        </button>
    );
};
