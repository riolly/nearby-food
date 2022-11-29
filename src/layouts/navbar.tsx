// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as React from 'react'
import {Link} from '@tanstack/react-router'
import {
	QueueListIcon as QueueListIconActive,
	MapIcon as MapIconActive,
} from '@heroicons/react/24/solid'
import {QueueListIcon, MapIcon} from '@heroicons/react/24/outline'

export function Navbar({className}: {className: string}) {
	const linkClass =
		'text-light-primary flex items-start gap-2 rounded px-2 py-1 font-medium hover:underline'
	return (
		<div
			className={`fixed bottom-0 z-10 flex w-full items-center justify-center rounded-t-xl border-t-0 bg-primary-darkest/60 bg-opacity-30 py-2 underline-offset-4 shadow-sm backdrop-blur-lg md:relative md:bg-inherit ${className}`}
		>
			<nav className='flex h-fit items-center gap-2 text-light-heading'>
				<Link
					to='/'
					className={linkClass}
					activeProps={{className: 'pointer-events-none underline'}}
					inactiveProps={{className: 'hover:underline'}}
				>
					{({isActive}) => (
						<span className='flex gap-2'>
							{isActive ? (
								<QueueListIconActive className='h-6 w-6 ' />
							) : (
								<QueueListIcon className='h-6 w-6' />
							)}
							List
						</span>
					)}
				</Link>
				<span className='text-light-primary invisible md:visible'>&#9671;</span>
				<Link
					to='/map'
					className={linkClass}
					activeProps={{className: 'pointer-events-none underline'}}
					inactiveProps={{className: 'hover:underline'}}
				>
					{({isActive}) => (
						<span className='flex gap-2'>
							{isActive ? (
								<MapIconActive className='h-6 w-6' />
							) : (
								<MapIcon className='h-6 w-6' />
							)}
							Maps
						</span>
					)}
				</Link>
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
			className={`min-h-screen bg-gradient-to-br from-red-900/90 to-amber-600/60 ${wrapperClassName}`}
		>
			<Navbar className={navbarClassName} />
			<div
				className={`flex flex-col items-center justify-center gap-8 px-0 pb-16 pt-12 md:gap-8 md:pt-4 md:pb-12 ${containerClassName}`}
			>
				{children}
			</div>
		</div>
	)
}
