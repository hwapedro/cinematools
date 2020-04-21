import React from 'react'
import { GeneralPage } from 'components/shared/smart/smartContainer'
import { Menu } from '../components/shared/menu'
import models from 'models'

export const autoRoutes = Object.keys(models).map((model) => ({
  plural: model,
  singular: model.slice(0, -1),
  route: `/${model}`,
  render: () => (
    <>
      <Menu />
      <GeneralPage model={model} />
    </>
  ),
  name: model,
}))
