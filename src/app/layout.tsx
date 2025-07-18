import type { Metadata } from "next"
import { PT_Sans } from "next/font/google"
import { Layout } from "@/containers/wrap"
import './main.scss'
const ptSan = PT_Sans({
  weight: "400",
})
const ptSanBold = PT_Sans({
  weight: "700",
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
      <body className={`${ptSan.className}  `}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
