import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Extract redux selectors from model schema
 */
export const useExtract = model => {
  const selectors = {};
  const states = {};

  useEffect(() => {
    // iterate over model
    Object.keys(model).forEach(key => {
      const keyType = model[key];

      if (keyType.length) {
        const nestedType = keyType[0];
        if (nestedType === 'Ref') {
          // well, this is array of refs then
          const { model, selector, titleField } = nestedType[1];
          const [selectorName, selectorFunction] = selector;
          selectors[selectorName] = useSelector(selectorFunction);
          states[key] = [null, null];
          [states[key][0], states[key][1]] = useState([]);
        }
      }
    });
  }, []);

  return {
    selectors,
    states
  };
}