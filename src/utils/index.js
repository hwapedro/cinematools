import models from 'models'
const multiField = ['items', 'films', 'halls']

export const checkMultiSelectModel = (model) => {
  return models[model].find((el) => el.type === 'multi')
}
