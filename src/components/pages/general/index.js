import React, { useState, useEffect } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '../../shared/buttons'
import TextField from '../../shared/inputs/input'
import { Checkbox } from '@material-ui/core/'
import { MultiSelect } from './multiselect'
import { useExtract } from './extractor'

// import { useProductsFetcher } from './hooks/useProductsFetcher'
// import { ShopItem } from './shopItem'
// import { ProductConstructor } from './constructor'

const useItemFetcher = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products);

  useEffect(() => {
    // dispatch(fetchProducts(10, 0))
  }, [])

  return products
}

const capitalize = str => str[0].toUpperCase() + str.slice(1);


const GeneralPageConstructor = ({ model, setEditMode, mode }) => {
  const { register, handleSubmit, watch, errors, getValues } = useForm();
  const { selectors, states } = useExtract(model);
  const dispatch = useDispatch();
  console.log(selectors, states);
  const onSubmit = (info) => {
    console.log('hehe xd', info);
    // depending on mode dispatch event
  }

  return (
    <div>
      <form>
        {Object.keys(model).map(key => {
          const keyType = model[key];
          if (keyType._type) {
            // fully described classifier
          }

          if (keyType === String) {
            // input
            return (
              <div key={key}>
                <TextField autoComplete="off" name={key} label={capitalize(key)}
                  type="text" innerRef={register} />
              </div>
            );
          } else if (keyType === Number) {
            // input type number
            return (
              <div key={key}>
                <TextField autoComplete="off" name={key} label={capitalize(key)}
                  type="number" innerRef={register} />
              </div>
            );
          } else if (keyType === Boolean) {
            // checkbox
            return (
              <div key={key}>
                <Checkbox color="primary"
                  name={key}
                  title={capitalize(key)}
                  innerRef={register}
                />
              </div>
            );
          } else if (keyType.length) {
            // this is an array!
            const nestedType = keyType[0];
            if (nestedType === 'Ref') {
              // well, this is array of refs then
              const { model, selector, titleField } = nestedType[1];
              return (
                <div key={key}>
                  <MultiSelect
                    keyName={capitalize(titleField)}
                    keyValue={states[key][0]}
                    listOfValues={selectors[selector[0]]}
                    valueTitle={valueTitle}
                    changeValue={states[key][1]}
                  />
                </div>
              );
            } else if (nestedType !== Number && nestedType !== String && nestedType !== Boolean) {
            }
          }
          return (
            <div key={key}>Че это за хуйня: {key}?</div>
          )
        })}
        {mode === 'ADD' ? (
          <Button
            color="primary"
            text="Add"
            onClick={handleSubmit(onSubmit)}
          />
        ) : (
            <Button
              color="primary"
              text="Save"
              onClick={handleSubmit(onSubmit)}
            />
          )}
      </form>
    </div>
  );
}

export const GeneralPage = ({ model }) => {
  // const products = useProductsFetcher()
  const [editMode, setEditMode] = useState(false)

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={() => setEditMode(true)}>
        <AddIcon />
      </Fab>
      {model && <GeneralPageConstructor model={model} setEditMode={setEditMode} mode="ADD" />}
      {/* {products.map(product => (
        <ShopItem key={product._id} product={product} />
      ))}
      {editMode && <ProductConstructor setEditMode={setEditMode} mode="ADD" />} */}
    </div>
  )
}

export const createPage = (route) => {

  return function GeneralPageComponent() {
    return (
      <GeneralPage model={route.model} />
    );
  }
} 