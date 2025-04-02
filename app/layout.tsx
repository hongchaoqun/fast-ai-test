import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>API Management Tool</title>
        <meta name="description" content="API management tool similar to Swagger and Postman" />
      </head>
      <body className={inter.className}>
          {children}
          <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}