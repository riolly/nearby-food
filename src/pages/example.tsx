import * as React from 'react'
import NavbarTopLayout from 'layouts/navbar-top'

function ExamplePage() {
	return (
		<NavbarTopLayout>
			<h1 className='flex items-center gap-0 bg-gradient-to-bl from-primary-darker to-primary-lighter bg-clip-text text-[2.75rem] font-extrabold text-transparent md:gap-2 md:text-[5rem]'>
				Example Page
			</h1>
		</NavbarTopLayout>
	)
}

export default ExamplePage
