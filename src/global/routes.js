import React from 'react'
import { GeneralPage } from 'components/shared/smart/smartContainer'
import { Menu } from '../components/shared/menu'
import models from 'models'

import './styles.css'

export const autoRoutes = Object.keys(models).map((model) => ({
  plural: model,
  singular: model.slice(0, -1),
  route: `/${model}`,
  render: () => (
    <div className="root">
      <Menu />
      <GeneralPage model={model} />
    </div>
  ),
  name: model,
}))
