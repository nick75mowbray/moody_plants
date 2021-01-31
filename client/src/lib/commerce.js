import Commerce from '@chec/commerce.js';
import key from '../config/keys';

export const commerce = new Commerce(key.REACT_APP_CHEC_PUBLIC_KEY);