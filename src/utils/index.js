import models from 'models'

export const checkMultiSelectModel = (model) => {
  return models[model].find((el) => el.type === 'multi')
}
