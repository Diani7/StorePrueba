import { every, keys, includes } from 'lodash';

/**
 * 
 * @param {object} body - request body
 * @param {object} modelAttributes - accepted attributes for model
 * @returns {boolean}
 */
export function isValidBody(body, modelAttributes) {
    const allowedKeys = keys(modelAttributes);
    return every(keys(body), key => includes(allowedKeys, key));
}
