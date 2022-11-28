import React from 'react'
import NavbarTopLayout from 'layouts/navbar-top'
import reactLogo from 'assets/react.svg'

function HomePage() {
	return (
		<NavbarTopLayout>
			<div className='flex flex-col items-center'>
				<a
					href='https://github.com/riolly/create-react-app/'
					target='_blank'
					rel='noreferrer'
					className=''
				>
					<h1 className='flex items-center gap-0 bg-gradient-to-bl from-primary-darker to-primary-lighter bg-clip-text text-[2.75rem] font-extrabold text-transparent md:gap-2 md:text-[5rem]'>
						Create&nbsp;
						<span>
							<a href='https://reactjs.org' target='_blank' rel='noreferrer'>
								<img
									src={reactLogo}
									className='w-20 animate-spin'
									alt='React'
								/>
							</a>
						</span>
						&nbsp;App
					</h1>
				</a>

				<p className='mt-2 text-xl md:-mt-2 md:text-2xl'>
					Riolly&apos;s opinion on building front-end app.
				</p>

				<p className='text-xl md:text-2xl'>
					For full stack app check{' '}
					<a
						href='https://t3.riolly.vercel.app/'
						className='font-highlight underline decoration-blue-300 underline-offset-4 transition-all hover:tracking-wider'
						target='_blank'
						rel='noreferrer'
					>
						create-t3-app
					</a>{' '}
				</p>
			</div>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
				<TechnologyCard
					name='Typescript'
					description='Stop using footgun (read javascript)'
					documentation='https://www.typescriptlang.org/'
				/>
				<TechnologyCard
					name='Vite'
					description='Modern build tools for faster development.'
					documentation='https://vitejs.dev/'
				/>
				<TechnologyCard
					name='Tailwind'
					description='Zen mode CSS. Styling feel like a breeze.'
					documentation='https://tailwindcss.com/'
				/>
				<TechnologyCard
					name='TanStack Query'
					description='Data fetching, caching, mutation easy by default.'
					documentation='https://tanstack.com/query/v4'
				/>
				<TechnologyCard
					name='TanStack Router'
					description='The first type-safe router human ever built with supercharge capability.'
					documentation='https://tanstack.com/router'
				/>
			</div>
		</NavbarTopLayout>
	)
}

type TechnologyCardProps = {
	name: string
	description: string
	documentation: string
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
	name,
	description,
	documentation,
}) => (
	<a
		className='flex max-w-xs flex-col gap-4 rounded-xl bg-light-bg/10 p-4 pl-6 pt-6 hover:bg-light-bg/20'
		href={documentation}
		target='_blank'
		rel='noreferrer'
	>
		<h3 className='text-xl font-bold md:text-2xl '>{name} 🡵</h3>
		<p className='md:text-lg'>{description}</p>
	</a>
)

export default HomePage
