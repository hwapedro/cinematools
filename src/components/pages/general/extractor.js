import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Extract redux selectors from model schema
 */
export const useExtract = model => {
  // iterate over model
  const selectors = {};
  const states = {};
  const fetchers = {};

  Object.keys(model).forEach(key => {
    const keyType = model[key];
    console.log(model, key, keyType);
    if (keyType.length) {
      const nestedType = keyType[0];
      if (nestedType === 'Ref') {
        // well, this is array of refs then
        const { model, selector, titleField } = keyType[1];
        const { name: selectorName, selector: selectorFunction, fetcher } = selector;

        selectors[selectorName] = useSelector(selectorFunction);
        fetchers[selectorName] = fetcher;

        const [s, ss] = useState([]);
        states[key] = [null, null];
        states[key][0] = s;
        states[key][1] = ss;
      }
    }
  });


  return {
    selectors,
    fetchers,
    states
  };
}

export const createExtractor = model => {
  const cached = null;

  return () => {
    return useExtract(model)
  }
}