import React from 'react'
import PricingCards from '../ui/PricingCards'

export default function Pricing() {
    return (
        <div className='min-h-[calc(100vh-64px)] text-center py-6 px-2 sm:px-4'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                Simple, <span className='text-green-500'>Transparent Pricing</span> 
            </h1>
            <p className='text-lg text-gray-600'>
                Choose the plan that fits your needs. All plans include core features to help you ace your interviews
            </p>
            </div>

            <PricingCards />
        </div>
    )
}
