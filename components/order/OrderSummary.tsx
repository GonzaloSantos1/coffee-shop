'use client'

import { useStore } from '@/src/store'
import ProductDetails from './ProductDetails'
import { useMemo } from 'react'
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

export default function OrderSummary() {
	const order = useStore(state => state.order)
	const clearOrder = useStore(state => state.clearOrder)
	const total = useMemo(
		() => order.reduce((total, item) => total + item.quantity * item.price, 0),
		[order]
	)

	const handleCreateOrder = async (formData: FormData) => {
		const data = {
			name: formData.get('name'),
			total,
			order,
		}

		const result = OrderSchema.safeParse(data)

		if (!result.success) {
			result.error.issues.forEach(issue => {
				toast.error(issue.message)
			})

			return
		}

		const response = await createOrder(data)
		if (response?.errors) {
			response.errors.forEach(issue => {
				toast.error(issue.message)
			})
		}

		toast.success('Order created successfully')
		clearOrder()
	}

	return (
		<aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
			<h1 className='text-4xl text-center font-black'>My Order</h1>
			{order.length === 0 ? (
				<p className='text-center my-10 px-4'>Cart is empty, start by adding some products :)</p>
			) : (
				<>
					<button
						type='button'
						onClick={() => clearOrder()}
						className='hover:underline font-medium mt-5 text-red-400'
					>
						Clear Cart
					</button>
					<div>
						<p className='text-2xl my-5 text-center bg-white w-full p-2 shadow'>
							Total: {''}
							<span className='font-bold'>{formatCurrency(total)}</span>
						</p>
						{order.map(item => (
							<ProductDetails
								key={item.id}
								item={item}
							/>
						))}
						<p className='text-2xl my-5 text-center bg-white w-full p-2 shadow'>
							Total: {''}
							<span className='font-bold'>{formatCurrency(total)}</span>
						</p>

						<form
							action={handleCreateOrder}
							className='w-full mt-5 space-y-5'
						>
							<input
								type='text'
								placeholder='Customer name'
								name='name'
								className='bg-white border p-2 w-full'
							/>

							<button
								type='submit'
								className='py-2 rounded text-white bg-slate-800 w-full text-center cursor-pointer font-medium hover:bg-green-500 transition'
							>
								Confirm Order
							</button>
						</form>
					</div>
				</>
			)}
		</aside>
	)
}
