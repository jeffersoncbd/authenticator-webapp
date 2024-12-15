import ptBR from './i18n/messages/ptBR.json';

type Messages = typeof ptBR;

declare global {
  interface IntlMessages extends Messages { config: boolean }
}
