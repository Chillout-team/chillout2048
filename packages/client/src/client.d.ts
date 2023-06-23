declare const __SERVER_PORT__: number;

declare interface Navigator extends Navigator {
    getBattery: () => Promise<any>;
}
