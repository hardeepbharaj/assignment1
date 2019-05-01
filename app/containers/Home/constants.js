/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const SET_PRODUCTS = 'app/containers/Home/SET_PRODUCTS';
export const UPDATE_DIRECT_FIELD = 'app/containers/Home/UPDATE_DIRECT_FIELD';
export const UPDATE_FORMFIELD_VALUE = 'app/containers/Home/UPDATE_FORMFIELD_VALUE';
export const SET_EDIT_FORM_FIELDS = 'app/containers/Home/EditProduct/SET_EDIT_FORM_FIELDS';
export const UPDATE_PRODUCTS = 'app/containers/Home/EditProduct/UPDATE_PRODUCTS';
