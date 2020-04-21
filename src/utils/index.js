import models from 'models'
const multiField = ['items', 'films', 'halls']

export const checkMultiSelectModel = (model) => {
  console.log(models[model].find((el) => el.type === 'multi'))
  return models[model].find((el) => el.type === 'multi')
}
