import { createNamespace } from 'cls-hooked';

export const asyncContext = createNamespace('my-app-context');

export const CONTEXT_KEYS = {
    USER_ID: 'userId',
};
