import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div>
            {/* gif load */}
            <div className="flex items-center justify-center w-full h-ful">
                <Image src="https://c.tenor.com/8Ykw8dO3QpwAAAAC/tenor.gif" alt="loading" width={500} height={500} />
            </div>
        </div>
    )
}
