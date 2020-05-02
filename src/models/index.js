import React from 'react'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import StorefrontIcon from '@material-ui/icons/Storefront'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import GavelIcon from '@material-ui/icons/Gavel'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import PersonIcon from '@material-ui/icons/Person'
import PeopleIcon from '@material-ui/icons/People'
import EventSeatIcon from '@material-ui/icons/EventSeat'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import WeekendIcon from '@material-ui/icons/Weekend'

export const modelRouter = {
  news: { level: 1, icon: <FiberNewIcon /> },
  users: { level: 2, icon: <PersonIcon /> },
  shopItems: { level: 1, icon: <FastfoodIcon /> },
  hallCells: { level: 1, icon: <EventSeatIcon /> },
  genres: { level: 1, icon: <TagFacesIcon /> },
  films: { level: 2, icon: <LiveTvIcon /> },
  ageRules: { level: 1, icon: <GavelIcon /> },
  actors: { level: 2, icon: <PeopleIcon /> },
  showtimes: { level: 0, icon: <FastfoodIcon /> },
  cinemas: { level: 2, icon: <AccountBalanceIcon /> },
  shops: { level: 1, icon: <StorefrontIcon /> },
  halls: { level: 2, icon: <WeekendIcon /> },
}
export default {
  news: [
    {
      name: 'title',
      type: 'field',
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
    },
  ],
  users: [
    {
      name: 'name',
      type: 'field',
    },
    {
      name: 'email',
      type: 'field',
    },
    {
      name: 'password',
      type: 'field',
    },
  ],
  shopItems: [
    {
      name: 'name',
      type: 'field',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'inStock',
      type: 'checkbox',
    },
    {
      name: 'image',
      type: 'image',
    },
  ],
  hallCells: [
    {
      name: 'name',
      type: 'field',
    },
    {
      name: 'color',
      type: 'field',
    },
    {
      name: 'price',
      type: 'number',
    },
  ],
  genres: [
    {
      name: 'name',
      type: 'field',
    },
  ],
  films: [
    {
      name: 'name',
      type: 'field',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'number',
    },
    {
      name: 'ageRule',
      model: 'ageRules',
      extractor: {
        name: (item, history, modelId, itemId) => `${item.name}`,
        key: (item) => item,
      },
    },
    {
      name: 'distributionStartDate',
      type: 'date',
    },
    {
      name: 'distributionEndDate',
      type: 'date',
    },
    {
      type: 'multi',
      arrays: [
        {
          name: 'actors',
          model: 'actors',
          extractor: {
            name: (item, history, modelId, itemId) => `${item.name}`,
            key: (item) => item,
          },
        },
        {
          name: 'genres',
          model: 'genres',
          extractor: {
            name: (item, history, modelId, itemId) => `${item.name}`,
            key: (item) => item,
          },
        },
      ],
    },
    {
      name: 'image',
      type: 'image',
    },
  ],
  ageRules: [
    {
      name: 'name',
      type: 'field',
    },
  ],
  actors: [
    {
      name: 'name',
      type: 'field',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'image',
    },
  ],
  showtimes: [],
  cinemas: [
    { name: 'name', type: 'field' },
    { name: 'address', type: 'field' },
    {
      type: 'multi',
      arrays: [
        {
          name: 'shops',
          model: 'shops',
          extractor: {
            name: (item) => `${item.name}`,
            key: (item) => item,
          },
        },
        {
          name: 'halls',
          model: 'halls',
          extractor: {
            name: (item) => `${item.name}`,
            key: (item) => item,
          },
        },
        {
          name: 'films',
          model: 'films',
          extractor: {
            name: (item, history, modelId, itemId) => <span onClick={() => history.push(`/film/${modelId}/${itemId}`)}>{`${item.name}`}</span>,
            key: (item) => item,
          },
        },
      ],
    },
  ],
  shops: [
    { name: 'name', type: 'field' },
    { name: 'description', type: 'field' },
    {
      type: 'multi',
      arrays: [
        {
          name: 'items',
          model: 'shopItems',
          extractor: {
            name: (item) => `${item.name}, $${(item.price / 100).toFixed(2)}`,
            key: (item) => item,
          },
        },
      ],
    },
  ],
  halls: [
    { name: 'name', type: 'field' },
    { name: 'structure', type: 'hall' },
  ],
}
