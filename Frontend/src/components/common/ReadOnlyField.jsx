import React from 'react'

export default function ReadOnlyField({ label, value }) {
    return (
        <div>
            <label className='block text-sm mb-1'>{label}</label>
            <div className='w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 text-sm'>
                {value}
            </div>
        </div>
    )
}