'use client'

import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type CategoryIconProps = {
	category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
	const params = useParams<{ slug: string }>()

	return (
		<Link
			href={`/order/${category.slug}`}
			className={`text-xl font-bold flex items-center gap-4 transition w-full p-3 last-of-type:border-b border-t ${
				category.slug == params.slug ? 'bg-amber-400' : 'hover:bg-gray-100'
			}`}
		>
			<div className='w-16 h-16 relative'>
				<Image
					src={`/icon_${category.slug}.svg`}
					alt={category.slug}
					fill
				/>
			</div>
			{category.name}
		</Link>
	)
}
