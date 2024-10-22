import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (locale === undefined || !routing.locales.includes(locale as Locale)) {
    locale = "ptBR";
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
