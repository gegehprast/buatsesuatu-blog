export interface ImageDimension {
    width: number
    height: number
}

export interface I_Image extends ImageDimension {
    file: File
    objectUrl: string
}
