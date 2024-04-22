import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Coffee Shop with App Router and Prisma',
	description: 'Coffee Shop with App Router and Prisma',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-gray-100 text-slate-700`}>{children}</body>
		</html>
	)
}
