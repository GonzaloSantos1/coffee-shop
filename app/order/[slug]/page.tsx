import ProductCard from '@/components/products/ProductCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'

async function getProducts(category: string) {
	const products = await prisma.product.findMany({
		where: {
			category: {
				slug: category,
			},
		},
	})

	return products
}

export default async function OrderPage({ params }: { params: { slug: string } }) {
	const products = await getProducts(params.slug)

	return (
		<>
			<Heading>Choose and customize your order</Heading>
			<div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start'>
				{products.map(product => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</>
	)
}
