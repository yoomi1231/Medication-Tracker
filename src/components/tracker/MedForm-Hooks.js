import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const FormContainer = styled.div`
    margin: auto;
    background-color: #fffbfb;
    padding: 50px 250px 50px 250px;
    opacity: 0.7;
`;

const ContentContainer = styled.div`
    height: auto;
    padding-bottom: 20px;
    font-size: 20px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;


const FormLabel = styled.label`
    color: blue;
`;

const ButtonGroup = styled.div`
    width: 120px;
    display: flex;
    justify-content: space-between;
    
`;

const CancelButton = styled(Link)`
    text-decoration: none;
    background-color: #EEEEEE;
    padding: 8px 20px;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: pointer;
    color: black;
    font-size: 15px;
    font-weight: bold;
`;

const SubmitButton = styled.button`
    background-color: #EEEEEE;
    padding: 8px 20px;
    text-decoration: none;
    font-weight: bold;
    border: 1px solid grey;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
`;



const ErrorContainer = styled.div`
    color: red;
`;

const MedFormHooks = ({ onFormSubmit, defaultValue }) => {
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
    const schedule = watch("schedule");
    // const frequencyOptions = [
    //     {label: "Morning", value: "morning"},
    //     {label: "Noon", value: "noon"},
    //     {label: "Evening", value: "evening"},
    //     {label: "Bedtime", value: "bedtime"},
    //     {label: "Weekly", value: "weekly"} 
    // ];
    const frequencyOptions = ["Morning", "Noon", "Evening", "Bedtime", "Weekly", "Occasional Use"];

    const onSubmit = (formValues) => {
        onFormSubmit(formValues);
    };

    const getDefaultValue = (inputName) => {
        return defaultValue && defaultValue[inputName];
    }

    const validateFreqLabel = () => {
        const values = getValues('frequency');

        return (
            values.filter(v => Boolean(v.label)).length >= 1
        );
    };

    const validateFreqDetail = () => {
        const values = getValues('frequency');
        

        for (let i = 0; i < values.length; i++) {
            if (Boolean(values[i].label) !== Boolean(values[i].detail)) {
                return false;
            }
        }

        return true;
    };

    const validateWeekly = () => {
        const values = getValues();

        if (Boolean(values.frequency[4].label) !== Boolean(values.weekly)) {
            return false;
        }

        return true;
    };

    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ContentContainer>
                    <FormLabel for="name">Medicaiton Name & Strength</FormLabel>
                    <input defaultValue={getDefaultValue('name')} type="text" name="name" id="name" {...register('name', { required: true })} />
                    <ErrorContainer>
                        {errors.name && (
                            <span>
                                Must enter a name
                            </span>
                        )}
                    </ErrorContainer>

                </ContentContainer>

                <ContentContainer>
                    <FormLabel for="route">Route of Administration</FormLabel>
                    <select defaultValue={getDefaultValue('route')} name="route" id="route" {...register('route', { required: true })}>
                        <option></option>
                        <option value="oral">Oral</option>
                        <option value="topical">Topical</option>
                        <option value="injectable">Injection</option>
                    </select>
                    <ErrorContainer>
                        {errors.route && (
                            <span>
                                Must choose a route
                            </span>
                        )}
                    </ErrorContainer>
                    
                </ContentContainer>

                <ContentContainer>
                    <FormLabel for="frequency">Frequency</FormLabel>
                    <InputWrapper>
                        <div>
                            {frequencyOptions.map((freq, index) =>
                                <div>
                                    <label for={freq}>{freq}</label>
                                    <input 
                                        defaultValue={getDefaultValue(`frequency[${index}].label`)} 
                                        name={`frequency[${index}].label`} 
                                        type="checkbox" 
                                        value={freq} 
                                        {...register(`frequency[${index}].label`, { 
                                            validate: validateFreqLabel 
                                        })} 
                                    />
                                    <input 
                                        defaultValue={getDefaultValue(`frequency[${index}].detail`)} 
                                        name={`frequency[${index}].detail`} 
                                        type="number" 
                                        min="1" 
                                        placeholder="how many tablets?" 
                                        {...register(`frequency[${index}].detail`, { 
                                            validate: validateFreqDetail
                                        })} 
                                    />
                                </div>
                            )}
                        </div>
                        <ErrorContainer>
                            {errors.frequency && (
                                <span>
                                    Please select frequency and enter count
                                </span>
                            )}
                        </ErrorContainer>
                    </InputWrapper>
                </ContentContainer>
                
                
                <ContentContainer>
                    <FormLabel for="note">Enter days for a weekly medication</FormLabel>
                    <input type="text" name="weekly" {...register('weekly', { validate: validateWeekly })} />
                    <ErrorContainer>
                        {errors.weekly && (
                            <span>
                                Please enter which days you use this weekly medication
                            </span>
                        )}
                    </ErrorContainer>
                </ContentContainer>
                <ContentContainer>
                    <FormLabel for="note">Note</FormLabel>
                    <input defaultValue={getDefaultValue('note')} type="text" name="note" {...register('note')} />
                </ContentContainer>
                <ButtonGroup>
                    <SubmitButton>Submit</SubmitButton>
                    <CancelButton to="/medications/list">Cancel</CancelButton>
                </ButtonGroup>
            </form>
        </FormContainer>
    );
};

export default MedFormHooks;


