import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Button from '../../../shared/buttons'
import TextField from '../../../shared/inputs/input'
import { changeActor, addActor } from '../../../../sagas/actors/actions'
import models from './models'

//smart fix
import { changeModel, addModel } from '../../../../sagas/smart//actions'

export const SmartConstructor = ({ value, model, setEditMode, edittMode }) => {
    const dispatch = useDispatch()

    const modelItem = models[model]
    let defaultValues = {}
    if (edittMode) {
        for (let i = 0; i < modelItem.length; i++) {
            const defaultParametr = modelItem[i].type === 'field' ? value[modelItem[i].name] : ''
            defaultValues[modelItem[i].name] = defaultParametr
        }
    }

    const { register, handleSubmit } = useForm({ defaultValues });


    const onSubmit = data => {
        alert(JSON.stringify(data));
    };

    const content = modelItem.map(el => {
        switch (el.type) {
            case "field":
                console.log(el.name, el)
                return <TextField autoComplete="off" name={el.name} label={el.name} inputRef={register} />
        }
    })


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {content}
            </form>
        </div>
    )
}
