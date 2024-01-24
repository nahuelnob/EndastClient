import {
  EDIT_DIN0,
  EDIT_DIN1,
  EDIT_DIN2,
  EDIT_DIN3,
  EDIT_AIN0,
  EDIT_AIN1,
  EDIT_AIN2,
  EDIT_AIN3,
  PLACAS,
} from "./types";

const initialState = {
  placas: [],
  din0: false,
  din1: false,
  din2: false,
  din3: false,
  ain0: 0,
  ain1: 0,
  ain2: 0,
  ain3: 0,
};

console.log(initialState);

const rootReducer = (state = initialState, { type, payload, dId }) => {
  switch (type) {
    ////////////////////////////////////////////
    case PLACAS:
      // const ain0Values = payload.map((Id) => Id.dId);
      const ainObject = payload.reduce((acc, id) => {
        acc[id.dId] = 0;
        return acc;
      }, {});
      return {
        ...state,
        placas: payload,
        ain0: ainObject,
        ain1: ainObject,
        ain2: ainObject,
        ain3: ainObject,
      };
    ////////////////////////////////////////////
    case EDIT_DIN0:
      return {
        ...state,
        din0: payload,
      };
    case EDIT_DIN1:
      return {
        ...state,
        din1: payload,
      };
    case EDIT_DIN2:
      return {
        ...state,
        din2: payload,
      };
    case EDIT_DIN3:
      return {
        ...state,
        din3: payload,
      };
    ////////////////////////////////////////////
    case EDIT_AIN0:
      return {
        ...state,
        ain0: { [dId]: payload },
      };
    case EDIT_AIN1:
      return {
        ...state,
        ain1: payload,
      };
    case EDIT_AIN2:
      return {
        ...state,
        ain2: payload,
      };
    case EDIT_AIN3:
      return {
        ...state,
        ain3: payload,
      };
    ////////////////////////////////////////////

    default:
      return { ...state };
  }
};

export default rootReducer;
