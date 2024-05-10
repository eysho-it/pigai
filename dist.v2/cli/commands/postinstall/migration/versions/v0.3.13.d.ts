declare function migration(): Promise<void>;
declare const _default: {
    version: string;
    migration: typeof migration;
};
export default _default;
