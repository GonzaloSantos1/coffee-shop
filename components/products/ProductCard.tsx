import { formatCurrency } from '@/src/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import AddProductButton from './AddProductButton'

type ProductCardProps = {
	product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<div className='border bg-white rounded h-full flex-col flex overflow-hidden shadow-sm'>
			<Image
				src={`/products/${product.image}.jpg`}
				alt={`Dish image ${product.name}`}
				width={400}
				height={500}
			/>

			<div className='p-5 flex flex-col gap-3 h-auto flex-1'>
				<h3 className='text-lg font-bold flex-1'>{product.name}</h3>
				<p className='font-black text-2xl text-amber-500'>{formatCurrency(product.price)}</p>
				<AddProductButton product={product} />
			</div>
		</div>
	)
}
