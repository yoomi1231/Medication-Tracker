import _ from 'lodash';

const medications = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_MED':
            return { ...state, [action.payload.id]: action.payload };
        case 'FETCH_MEDS':
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case 'FETCH_MED':
            return { ...state, [action.payload.id]: action.payload };
        case 'EDIT_MED':
            return { ...state, [action.payload.id]: action.payload };
        case 'DELETE_MED':
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default medications;