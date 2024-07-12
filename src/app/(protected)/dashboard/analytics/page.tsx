import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div>
            {/* gif load */}
            <div className="flex items-center justify-center w-full h-ful">
                <Image src="https://media1.tenor.com/m/d8wg6_lZrKkAAAAC/elon-musk.gif" alt="loading" width={500} height={500} />
            </div>
        </div>
    )
}
