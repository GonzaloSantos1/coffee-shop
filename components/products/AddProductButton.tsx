'use client'

import { Product } from '@prisma/client'
import { useStore } from '@/src/store'

type AddProductButtonProps = {
	product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
	const addToOrder = useStore(state => state.addToOrder)

	return (
		<button
			type='button'
			className='bg-slate-800 hover:bg-amber-500 transition text-white w-full p-3 rounded font-medium cursor-pointer'
			onClick={() => addToOrder(product)}
		>
			Add
		</button>
	)
}
