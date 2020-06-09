import React from 'react'
import { RectShape, TextBlock } from 'react-placeholder/lib/placeholders'

const ArticlePlaceHolder = (): React.ReactElement => {
    return (
        <div className="flex flex-wrap w-full min-h-full mt-2">
            <div className="flex w-full">
                <RectShape color="#E0E0E0" style={{ width: 900, height: 480 }} />
            </div>
            <div className="flex w-full mt-10">
                <TextBlock color='#E0E0E0' rows={2} />
            </div>
            <div className="flex w-full mt-10">
                <TextBlock color='#E0E0E0' rows={6} />
            </div>
            <div className="flex w-full mt-4">
                <TextBlock color='#E0E0E0' rows={4} />
            </div>
            <div className="flex w-full mt-4">
                <TextBlock color='#E0E0E0' rows={8} />
            </div>
            <div className="flex w-full mt-4">
                <TextBlock color='#E0E0E0' rows={5} />
            </div>
        </div>
    )
}

export default ArticlePlaceHolder
