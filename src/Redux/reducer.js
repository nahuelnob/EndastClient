import { EDIT_DIN0, EDIT_DIN1, EDIT_DIN2, EDIT_DIN3, EDIT_AIN0, EDIT_AIN1, EDIT_AIN2, EDIT_AIN3 } from "./types";

const initialState = {
  din0: '{value:3000}',
  din1: '{value:100}',
  din2: '{value:100}',
  din3: '{value:100}',
  ain0: '{value:100}',
  ain1: '{value:0}',
  ain2: '{value:100}',
  ain3: '{value:100}',
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
          ain0: payload,
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
