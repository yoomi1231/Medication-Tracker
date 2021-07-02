import medications from '../apis/medications';
import history from '../history';

export const createMed = (formValues) => async dispatch => {
    const response = await medications.post('medications', { ...formValues })
    console.log(response.data);

    dispatch ({ type: 'CREATE_MED', payload: response.data });
    history.push('/medications/list');
};

export const fetchMeds = () => async dispatch => {
    const response = await medications.get('/medications');

    dispatch ({ type: 'FETCH_MEDS', payload: response.data });
};

export const fetchMed = (id) => async dispatch => {
    const response = await medications.get(`/medications/${id}`);

    dispatch ({ type: 'FETCH_MED', payload: response.data });
};

export const editMed = (id, formValues) => async dispatch => {
    const response = await medications.patch(`/medications/${id}`, formValues);

    dispatch ({ type: 'EDIT_MED', payload: response.data });
    history.push('/medications/list');
};

export const deleteMed = (id) => async dispatch => {
    await medications.delete(`medications/${id}`);

    dispatch({ type: 'DELETE_MED', payload: id })
    history.push('/medications/list');
};

