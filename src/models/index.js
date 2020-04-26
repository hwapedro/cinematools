import React from 'react'

export default {
  news: [
    {
      name: 'title',
      type: 'field'
    },
    {
      name: 'text',
      type: 'field'
    },
    {
      name: 'date',
      type: 'date'
    },
    {
      name: 'comments',
      type: 'multi',
      arrays: [
        {
          name: 'comments',
          model: 'comments',
          extractor: {
            name: (item, history, modelId, itemId) => `${item.name}`,
            key: (item) => item,
          },
        }
      ],
    },
  ],
  users: [
    {
      name: 'name',
      type: 'field'
    },
    {
      name: 'email',
      type: 'field'
    },
    {
      name: 'password',
      type: 'field'
    },
  ],
  shopItems: [
    {
      name: 'name',
      type: 'field'
    },
    {
      name: 'price',
      type: 'number'
    },
    {
      name: 'inStock',
      type: 'checkbox'
    },
    {
      name: 'image',
      type: 'image'
    }
  ],
  hallCells: [
    {
      name: 'name',
      type: 'field'
    },
    {
      name: 'color',
      type: 'field'
    },
    {
      name: 'price',
      type: 'number'
    },
    {
      name: 'index',
      type: 'number'
    },
  ],
  genres: [
    {
      name: 'name',
      type: 'field'
    },
  ],
  films: [
    {
      name: 'name',
      type: 'field'
    },
    {
      name: 'description',
      type: 'field'
    },
    {
      name: 'duration',
      type: 'number'
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
      name: 'releaseDate',
      type: 'date'
    },
    {
      name: 'distributionStartDate',
      type: 'date'
    },
    {
      name: 'distributionEndDate',
      type: 'date'
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
        }
      ],
    }
  ],
  ageRules: [
    {
      name: 'name',
      type: 'field'
    },
  ],
  actors: [
    {
      name: 'name',
      type: 'field'
    },
    {
      name: 'bio',
      type: 'textarea'
    },
    {
      name: 'image',
      type: 'image'
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
            name: (item, history, modelId, itemId) => <div onClick={() => history.push(`/film/${modelId}/${itemId}`)}>`${item.name}`</div>,
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
  ]
}
