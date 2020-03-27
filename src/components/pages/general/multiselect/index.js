import React, { useState, useEffect } from 'react'

export const MultiSelect = ({ keyName, keyValue, changeValue, listOfValues, titleExtractor, keyExtractor }) => {
  console.log(listOfValues)
  return (
    <div>
      <div>Me sleect multi</div>
      {listOfValues && listOfValues.length && listOfValues.map(val => {
        return (
          <div key={keyExtractor(val)}>
            <button type="button">{titleExtractor(val)}</button>
          </div>
        );
      })}
    </div>
  );
}