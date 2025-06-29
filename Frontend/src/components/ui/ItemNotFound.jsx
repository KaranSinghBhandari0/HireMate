import React from 'react';

export default function ItemNotFound({ text = "No items found." }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-12">
            <img 
                src="/oops.png" 
                alt="Not Found" 
                className="w-40 h-40 object-contain mb-4 opacity-80" 
            />
            <p className="text-gray-600 text-lg font-medium">{text}</p>
        </div>
    );
}
