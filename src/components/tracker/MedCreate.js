import React from 'react';
import { useDispatch } from 'react-redux';
import { createMed } from '../../actions';
import MedFormHooks from './MedForm-Hooks';
import styled from '@emotion/styled';

const FormContainer = styled.div`
    width: 80%;
    margin: auto;
`;

const Title = styled.h3`
    font-size: 20px;
`;

const MedCreate = () => {
    const dispatch = useDispatch();

    const onSubmit = (formValues) => {
        dispatch(createMed(formValues));
    };

    return (
        <FormContainer>
            <Title>Add a New Medication</Title>
            <MedFormHooks onFormSubmit={onSubmit} />
        </FormContainer>
    );
};

export default MedCreate;