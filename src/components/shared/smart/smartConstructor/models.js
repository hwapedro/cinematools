export default {
    actors: [
        { name: 'name', type: 'field' },
        { name: 'bio', type: 'field' }
    ],
    shopItems: [
        { name: 'name', type: 'field' },
        { name: 'price', type: 'number' },
        { name: 'isStock', type: 'checkbox' },
    ],
    ageRules: [
        { name: 'name', type: 'field', }
    ],
    comments: [
        { name: 'text', type: 'field' },
        { name: 'time', type: 'date' },
    ],
    shops: [
        { name: 'name', type: 'field' },
        { name: 'description', type: 'field' },
        { name: 'items', type: 'refsArray', model: 'shopItems' },
    ]
    //   export const News = {
    //     title: String,
    //     text: String,
    //     date: Date,
    //     comments: [Comment],
    // }

    //   export const Genre = {
    //     name: String,
    // }

    //   export const HallCell = {
    //     EMPTY: 0,
    //     STANDARD: 1,
    //     PREMIUM: 2,
    //     VIP: 3
    // }

    //   export const Hall = {
    //     name: String,
    //     structure: [[Number]],
    // }

    //   export const ShopItem = {
    //     name: String,
    //     price: Number,
    //     inStock: Boolean,
    // }

    //   export const Shop = {
    //     name: String,
    //     description: String,
    //     items: ['Ref', {
    //         model: ShopItem,
    //         selector: {
    //             name: 'shopItems',
    //             selector: state => state.products.products,
    //             fetcher: () => fetchProducts()
    //         },
    //         titleExtractor: item => `${item.name}, ${(item.price / 100).toFixed(2)}`,
    //         keyExtractor: item => item._id
    //     }],
    //     working: Boolean,
    // }

    //   export const Seat = {
    //     row: Number,
    //     number: Number,
    //     type: Number,
    // }

    //   export const Film = {
    //     name: String,
    //     description: String,
    //     // in minutes
    //     duration: Number,
    //     ageRule: AgeRule,
    //     releaseDate: Date,
    //     distributionStartDate: Date,
    //     distributionEndDate: Date,
    //     actors: [Actor],
    //     genres: [Genre],
    // }

    //   export const Showtime = {
    //     time: Date,
    //     film: Film,
    //     halls: [Hall],
    // }

    //   export const Cinema = {
    //     name: String,
    //     address: String,

    //     halls: [Hall],

    //     shops: [Shop],
    //     films: [Film],

    //     showtimes: [Showtime],
    // }
}