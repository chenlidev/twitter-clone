import React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";
import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Twitter",
    description: "A Next.js 13 Meta Twitter clone application",
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <ClerkProvider>
            <html lang='en'>
            <body className={inter.className}>
            <main className='flex min-h-screen flex-row'>
                <LeftSidebar/>
                <div className='flex w-full flex-col'>
                    <section className='main-container flex-1'>
                        <div className='w-full max-w-4xl'>{children}</div>
                    </section>
                </div>
                <RightSidebar/>
            </main>
            </body>
            </html>
        </ClerkProvider>
    );
}
