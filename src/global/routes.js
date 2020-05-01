import React from 'react'

import { GeneralPage } from 'components/shared/smart/smartContainer'
import { Menu } from '../components/shared/menu'
import models from 'models'
import { modelRouter } from 'models'

import './styles.css'

export const autoRoutes = Object.keys(models).map((model) => ({
  plural: model,
  singular: model.slice(0, -1),
  route: `/${model}`,
  icon: modelRouter[model].icon,
  routerLevel: modelRouter[model].level,
  render: () => (
    <div className="root">
      <Menu routeLevel={modelRouter[model].level} />
      <GeneralPage model={model} />
    </div>
  ),
  name: model,
}))
