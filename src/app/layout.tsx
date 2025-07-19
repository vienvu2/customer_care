import type { Metadata } from "next"
import { Mona_Sans } from "next/font/google"
import { Layout } from "@/containers/wrap"
import "./main.scss"
export const font = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})


export const metadata: Metadata = {
  title: "Customer Care",
  description: "A customer care application built with Next.js and Prisma",
  keywords: ["Next.js", "Prisma", "Customer Care", "Web Application"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
