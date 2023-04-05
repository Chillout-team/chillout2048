// import App from './App';
// import { render, screen } from '@testing-library/react';

// const appContent = 'Вот тут будет жить ваше приложение :)';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve('hey') }),
);

//TODO заглушка убрать при написании нормальных тестов
function sum(a: number, b: number) {
    return a + b;
}

test('Example test', async () => {
    //TODO заглушка убрать при написании нормальных тестов
    expect(sum(1, 2)).toBe(3);
    //render(<App />);
    //expect(screen.getByText(appContent)).toBeDefined();
});

