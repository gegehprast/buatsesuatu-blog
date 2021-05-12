import React from 'react'
import Link from 'next/link'
import { handleImageError } from '../utils/util'
import SearchRenderer from './SearchRenderer'
import Tag from './Tag'

interface Props {
    title: string
    cover?: string
    text: string
    tags: string[]
    link?: { href: string, as: string }
    search?: string
    children?: React.ReactChild
}

const Card: React.FC<Props> = ({ title, text, cover, tags, link, search, children }) => {
    return (
        <div className="flex w-full px-1 mb-3 md:w-1/2 lg:w-1/3">
            <div className="relative flex flex-col flex-grow w-full overflow-hidden transition-shadow duration-200 ease-in rounded shadow-lg hover:shadow-bs">
                <div className="relative w-full h-210-px md:h-190-px lg:h-210-px">
                    {link ?
                        <Link href={link.href} as={link.as} >
                            <a tabIndex={-1}>
                                <img className="absolute object-cover w-full h-full bg-white" 
                                    src={cover ? cover : '/logo-fit.png'} 
                                    alt={title} 
                                    onError={handleImageError} 
                                />
                                <div className="absolute object-cover w-full h-full bg-black opacity-0" />
                            </a>
                        </Link> :
                        <>
                            <img className="absolute object-cover w-full h-full bg-white" 
                                src={cover ? cover : '/logo-fit.png'} 
                                alt={title} 
                                onError={handleImageError} 
                            />
                            <div className="absolute object-cover w-full h-full bg-black opacity-0" />
                        </>
                    }
                </div>

                <div className="flex-1 px-5 py-3">
                    <div className="mb-2 text-base font-bold lg:text-lg">
                        {link ? 
                            <Link href={link.href} as={link.as} >
                                <a className="text-indigo-600 visited:text-purple-600 hover:text-indigo-800">
                                    {search ? <SearchRenderer search={search} text={title} /> : title}
                                </a>
                            </Link> :
                            <>{search ? <SearchRenderer search={search} text={title} /> : title}</>
                        }
                    </div>
                    
                    <p className="text-sm text-gray-700">
                        {search && text ? <SearchRenderer search={search} text={text} /> : text}
                    </p>
                </div>
                
                <div className="flex flex-wrap px-5 py-3">
                    {tags.map((tag, i) => (
                        <Tag key={i} length={tags.length} tag={tag} i={i} />
                    ))}
                </div>

                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card
