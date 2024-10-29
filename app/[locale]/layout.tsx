import HeaderBar from "@/components/HeaderBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SessionContextProvider, { SessionChecker } from "@/contexts/Session";
import { Locale, routing } from "@/i18n/routing";
import { StoreProvider } from "@/store";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
    title: "AuthTor",
    description: "",
};

export default async function RootLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode;
    params: { locale: Locale };
}>) {
    if (!routing.locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <SessionContextProvider>
                        <StoreProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                            >
                                <div className="h-screen flex flex-col">
                                    <HeaderBar />
                                    <SessionChecker>
                                        {children}
                                    </SessionChecker>
                                    <Toaster />
                                </div>
                            </ThemeProvider>
                        </StoreProvider>
                    </SessionContextProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
