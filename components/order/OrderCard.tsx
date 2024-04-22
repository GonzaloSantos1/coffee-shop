import { completeOrder } from '@/actions/complete-order-action'
import { OrderWithProducts } from '@/src/types'
import { formatCurrency } from '@/src/utils'

type OrderCardProps = {
	order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {
	return (
		<section
			aria-labelledby='summary-heading'
			className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4 flex flex-col'
		>
			<p className='text-2xl font-medium text-slate-900'>Client: {order.name} </p>
			<p className='text-lg font-medium text-slate-900'>Products:</p>
			<dl className='mt-6 space-y-4 flex-1'>
				{order.orderProducts.map(product => (
					<div
						key={product.id}
						className='flex items-center gap-2 border-t pt-4'
					>
						<dt className='flex items-center text-sm text-gray-500'>
							<span className='font-semibold'>
								({product.quantity}) {''}
							</span>
						</dt>
						<dd className='font-medium text-sm text-slate-900'>{product.product.name}</dd>
					</div>
				))}
				<div className='flex items-center justify-between border-t border-gray-200 pt-4'>
					<dt className='text-base font-bold text-slate-900'>Total:</dt>
					<dd className='text-base font-bold text-slate-900'>{formatCurrency(order.total)}</dd>
				</div>
			</dl>

			<form action={completeOrder}>
				<input
					type='hidden'
					value={order.id}
					name='order_id'
				/>
				<button
					type='submit'
					className='bg-slate-800 hover:bg-green-500 rounded text-white w-full mt-5 p-3 font-medium transition cursor-pointer'
				>
					Mark as completed
				</button>
			</form>
		</section>
	)
}
