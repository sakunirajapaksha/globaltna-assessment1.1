import "./globals.css";

export const metadata = {
title: "Service Request Board",
description: "Home Service Request Platform",
};

export default function RootLayout({
children,
}) {
return ( <html lang="en"> <body>
{children} </body> </html>
);
}
