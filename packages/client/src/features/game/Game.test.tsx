import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { Game } from "./Game";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GameEngine } from "../../utils/game/Game";

describe("Game", () => {
    test("Should be render the game with start alert", () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Game />
                </Provider>
            </BrowserRouter>,
        );
        const startButton = screen.getByText("Начать игру!");

        expect(startButton).toBeInTheDocument();
    });

    test("Should return the initial map for new game", () => {
        const expectedGameEngineMap = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];
        GameEngine.newGame();

        expect(GameEngine.map).toEqual(expectedGameEngineMap);
    });

    test("Should return true for movement up", () => {
        const isMovedUp = GameEngine.moveUp();

        expect(isMovedUp).toBe(true);
    });

    test("Should return true for movement down", () => {
        const isMovedDown = GameEngine.moveDown();

        expect(isMovedDown).toBe(true);
    });

    test("Should return true for movement to the left", () => {
        const isMovedLeft = GameEngine.moveLeft();

        expect(isMovedLeft).toBe(true);
    });

    test("Should return true for movement to the right", () => {
        const isMovedRight = GameEngine.moveRight();

        expect(isMovedRight).toBe(true);
    });
});
