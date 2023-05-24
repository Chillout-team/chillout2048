export const requestValidator = (data: any) => {
    if (JSON.stringify(data) === "{}" || typeof data !== "object") {
        throw new Error("Not valid or empty data");
    }
};
