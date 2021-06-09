import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import MedFormHooks from './MedForm-Hooks';
import { fetchMed, editMed } from '../../actions';
import styled from '@emotion/styled';

const FormContainer = styled.div`
    width: 80%;
    margin: auto;
`;

const Title = styled.h3`
    font-size: 20px;
`;

const MedEdit = (props) => {
    const dispatch = useDispatch();
    const medication = useSelector(state => state.medications[props.match.params.id]);


    useEffect(() => {
        dispatch(fetchMed(props.match.params.id))
        console.log(props.match.params.id)
        console.log(medication)
    }, []);

    const onSubmit = (formValues) => {
        dispatch(editMed(props.match.params.id, formValues));
    };

    if (!medication) {
        return <div>Loading</div>;
    }

    return (
        <FormContainer>
            <Title>Edit a Medication</Title>
            <MedFormHooks
                defaultValue={medication}
                onFormSubmit={onSubmit}
            />
        </FormContainer>
    );
};

export default MedEdit;