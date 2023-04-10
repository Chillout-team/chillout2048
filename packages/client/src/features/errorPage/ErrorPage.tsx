import { FC } from "react";
import cls from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";

interface IErrorPageProps {
    type: "404" | "500";
}

/** Компонент для страниц ошибок 404 и 500. */
export const ErrorPage: FC<IErrorPageProps> = ({ type }) => {
    const pageInfo = {
        "500": {
            title: "500",
            description: "Мы уже фиксим",
        },
        "404": {
            title: "404",
            description: "Этой страницы не существует. Но вы существуете.",
        },
    }[type];

    return (
        <main className={cls.errorPage}>
            <section>
                <h1 className={cls.errorPageHeading}>{pageInfo.title}</h1>
                <p className={cls.errorPageParagraph}>{pageInfo.description}</p>
            </section>
            <section className={cls.errorPageFooter}>
                <Link to="/" className={cls.errorPageLink}>
                    Назад к игре
                </Link>
            </section>
        </main>
    );
};
