/**
 * Created by sm on 07/05/16.
 */

import Validator from './validator';
import ValidatorTypes from './validator-types';

export const NAME_PATTERN_VALIDATOR = new Validator(ValidatorTypes.regex, /^([a-z]|_)+([a-z]|\d|-|_)*$/i);
export const NAME_LENGTHS_VALIDATOR = new Validator(ValidatorTypes.length, { min: 2, max: 64 });