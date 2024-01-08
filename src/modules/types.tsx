export type GameListProps = {
    categories: string[]
    name: string
    image: string
    id: string
}


export type AmountListProps = {
    game: string
    amount: number
}

export type GameListResProps = {
    data: GameListProps[]
}


export type ParamsFilterProps = {
    _id: string
    title: string
    filter: string
    url: string
}