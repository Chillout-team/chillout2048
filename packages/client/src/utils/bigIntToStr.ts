export const bigIntToStr = (score: number) => {
    if (score < 1000) {
        return `${score}`;
    } else if (score >= 1000 && score < 1000000) {
        return `${score / 1000}K`;
    } else {
        return `${score / 1000000}KК`;
    }
};
