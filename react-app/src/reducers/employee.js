import { ACTION_TYPES } from "../actions/employee";

const initialState = {
  employeeList: []
};

export const employee = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL:
      return {
        ...state,
        employeeList: [...action.payload]
      };

    case ACTION_TYPES.CREATE:
      return {
        ...state,
        employeeList: [...state.employeeList, action.payload]
      };

    case ACTION_TYPES.UPDATE:
      return {
        ...state,
        employeeList: state.employeeList.map(x =>
          x.id == action.payload.id ? action.payload : x
        )
      };

    case ACTION_TYPES.DELETE:
      return {
        ...state,
        employeeList: state.employeeList.filter(x => x.id != action.payload)
      };

    default:
      return state;
  }
};
