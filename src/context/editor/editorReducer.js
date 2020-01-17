import { SET_VALUE } from "../types";

export default (state, action) => {
	switch (action.type) {
		case SET_VALUE:
			return {
				code: action.payload
			};
		default:
			return state;
	}
};
