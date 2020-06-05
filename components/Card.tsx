import React from 'react'

interface Props {
    title: string
    cover: string
    text: string
    tags: string[]
}

const Card: React.FC<Props> = ({ title, text, cover, tags }) => {
    return (
        <div className="flex w-full px-1 mb-3 w-100 md:w-1/2 lg:w-1/3">
            <div className="relative flex flex-col flex-grow w-full overflow-hidden rounded shadow-lg">
                <div className="relative w-full h-210-px md:h-190-px lg:h-210-px">
                    <img className="absolute object-cover w-full h-full" src={cover} alt="Sunset in the mountains" />
                    <div className="glass-helper">
                        <div className="glass"></div>
                    </div>
                </div>

                <div className="flex-1 px-5 py-3">
                    <div className="mb-2 text-base font-bold lg:text-lg">{title}</div>
                    <p className="text-sm text-gray-700">
                        {text}
                    </p>
                </div>
                
                <div className="flex flex-wrap px-5 py-3">
                    {tags.map((tag, i) => (
                        <span key={i} className={`inline-block px-3 py-1 ${i !== tags.length - 1 && 'mr-2'} my-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full`}>#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Card
