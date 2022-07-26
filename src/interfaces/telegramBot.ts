export interface IBot {
    start: () => void;
    webhookCallback: () => any;
    setWebhook: (webhook: string) => void;
}