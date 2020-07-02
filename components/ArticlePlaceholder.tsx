import React from 'react'
import { RectShape, TextBlock } from 'react-placeholder/lib/placeholders'

const ArticlePlaceHolder = (): React.ReactElement => {
    return (
        <div className="flex flex-wrap w-full min-h-full mt-2">
            <div className="flex w-full">
                <RectShape color="#E0E0E0" style={{ width: '100%', height: 480, margin: '0' }} />
            </div>
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
            <Block />
        </div>
    )
}

const Block = (): JSX.Element => {
    return (
        <>
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
        </>
    )
}

export default ArticlePlaceHolder
