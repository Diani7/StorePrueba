import { every, keys, includes } from 'lodash';

/**
 * Comprueba si todas las claves en el cuerpo de la solicitud están permitidas por el modelo.
 * 
 * @param {object} body - El cuerpo de la solicitud que contiene los datos a validar.
 * @param {object} modelAttributes - Un objeto que representa los atributos aceptados por el modelo.
 * @returns {boolean} - Retorna verdadero si todas las claves en el cuerpo están permitidas, de lo contrario falso.
 */
export function isValidBody(body, modelAttributes) {
    const allowedKeys = keys(modelAttributes);
    return every(keys(body), key => includes(allowedKeys, key));
}
