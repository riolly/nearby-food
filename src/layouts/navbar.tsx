import * as React from 'react'
import {Link} from '@tanstack/react-router'

export function Navbar({className}: {className: string}) {
	const linkClass =
		'text-light-primary flex items-start gap-2 rounded px-2 py-1 font-medium hover:underline'
	return (
		<div
			className={`fixed bottom-0 z-10 flex w-full items-center justify-center border-t-0 bg-primary-darkest/50 bg-opacity-30 py-2 underline-offset-4 shadow-sm backdrop-blur-lg md:relative md:bg-inherit ${className}`}
		>
			<nav className='flex h-fit items-center gap-2 text-light-heading'>
				<Link to='/' className={linkClass}>
					Home
				</Link>
				{/* <span className='text-light-primary invisible md:visible'>&#9671;</span> */}
			</nav>
		</div>
	)
}

export default function NavbarLayout({
	children,
	wrapperClassName = '',
	navbarClassName = '',
	containerClassName = '',
}: {
	wrapperClassName?: string
	containerClassName?: string
	navbarClassName?: string
	children: React.ReactNode
}) {
	return (
		<div
			className={`min-h-screen bg-gradient-to-br from-primary-darkest to-secondary-lightest/50 ${wrapperClassName}`}
		>
			<Navbar className={navbarClassName} />
			<div
				className={`flex flex-col items-center justify-center gap-8 px-0 pb-12 pt-12 md:gap-8 md:pt-4 md:pb-16 ${containerClassName}`}
			>
				{children}
			</div>
		</div>
	)
}
