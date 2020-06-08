import React from 'react'
import { RectShape } from 'react-placeholder/lib/placeholders'

const items = [1,2,3,4,5,6,7,8,9,10,11,12]

const CardsPlaceHolder = (): React.ReactElement => {
    return (
        <div className="flex flex-wrap w-full min-h-full mt-6">
            {items.map(item => <div key={item} className="flex w-full px-1 mb-3 md:w-1/2 lg:w-1/3">
                <RectShape color="#E0E0E0" style={{ width: 300, height: 500 }} />
            </div>)}
        </div>
    )
}

export default CardsPlaceHolder
