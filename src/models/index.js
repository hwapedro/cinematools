import { fetchProducts } from "../sagas/products/actions"

export const Actor = {
  name: String,
  bio: String,
}

export const AgeRule = {
  name: String,
}

export const Comment = {
  text: String,
  time: Date,
}

export const News = {
  title: String,
  text: String,
  date: Date,
  comments: [Comment],
}

export const Genre = {
  name: String,
}

export const HallCell = {
  EMPTY: 0,
  STANDARD: 1,
  PREMIUM: 2,
  VIP: 3
}

export const Hall = {
  name: String,
  structure: [[Number]],
}

export const ShopItem = {
  name: String,
  price: Number,
  inStock: Boolean,
}

export const Shop = {
  name: String,
  description: String,
  items: ['Ref', {
    model: ShopItem,
    selector: {
      name: 'shopItems',
      selector: state => state.products.products,
      fetcher: () => fetchProducts()
    },
    titleExtractor: item => `${item.name}, ${(item.price / 100).toFixed(2)}`,
    keyExtractor: item => item._id
  }],
  working: Boolean,
}

export const Seat = {
  row: Number,
  number: Number,
  type: Number,
}

export const Film = {
  name: String,
  description: String,
  // in minutes
  duration: Number,
  ageRule: AgeRule,
  releaseDate: Date,
  distributionStartDate: Date,
  distributionEndDate: Date,
  actors: [Actor],
  genres: [Genre],
}

export const Showtime = {
  time: Date,
  film: Film,
  halls: [Hall],
}

export const Cinema = {
  name: String,
  address: String,

  halls: [Hall],

  shops: [Shop],
  films: [Film],

  showtimes: [Showtime],
}


export const autoRoutes = {
  ageRule: {
    plural: 'ageRules',
    route: '/ageRules',
    model: AgeRule,
    name: 'Age Rules'
  },
  genre: {
    plural: 'genres',
    route: '/genres',
    model: Genre,
    name: 'Genres'
  },
  shops: {
    plural: 'shops',
    route: '/shops',
    model: Shop,
    name: 'Shops'
  }
}