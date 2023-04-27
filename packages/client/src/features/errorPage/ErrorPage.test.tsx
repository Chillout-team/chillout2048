import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';
import { ErrorPage } from "../errorPage/ErrorPage";
import { BrowserRouter } from "react-router-dom";

describe("ErrorPage", () => {
    test("Should be render error 500", () => {
        render(
            <BrowserRouter>
                <ErrorPage type="500" />
            </BrowserRouter>,
        );
        const headerElement = screen.getByText("500");

        expect(headerElement).toBeInTheDocument();
    });

    test("Should be render error 404", () => {
        render(
            <BrowserRouter>
                <ErrorPage type="404" />
            </BrowserRouter>,
        );
        const headerElement = screen.getByText("404");

        expect(headerElement).toBeInTheDocument();
    });

    test("Page should contain a back link", () => {
        render(
            <BrowserRouter>
                <ErrorPage type="404" />
            </BrowserRouter>,
        );
        const linkElement = screen.getByText("Назад к игре");

        expect(linkElement).toBeInTheDocument();
    });
});
