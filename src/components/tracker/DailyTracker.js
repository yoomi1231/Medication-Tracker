import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeds } from '../../actions';
import styled from '@emotion/styled';

const FrequencyContainer = styled.div`
    margin: 10px 0;
    height: 140px;
    border: 5px solid #9FA5A7;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: #fff2f2;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align : center;
    padding-top: 10px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1.2em;
    justify-content: space-between;
    width: 80%;
`;

const DateContainer = styled.div`
    text-align: end;
`;

const WeeklyMedContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const WeeklyMed = styled.div`
    display: flex;
    padding-right: 20px;
`;

const FreqLabel = styled.span`
    font-size: 20px;
`;

const Med = styled.div`
`;

const ListContainer = styled.div`
    width: 80%;
`;

const FREQ_LABELS = ["Morning", "Noon", "Evening", "Bedtime"];
const weekdays = new Array(
    "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
);
    
const DailyTracker = () => {
    const today = new Date();
    const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    const day = today.getDay();
    const medications = useSelector(state => Object.values(state.medications));
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(fetchMeds());
    }, []);

    if (medications.length === 0) {
        return <div>loading...</div>
    }

    const renderMedName = (index) => {
        return medications.map((entry) => {
            let { name, frequency } = entry;
            
            if (frequency[index].detail) {
                const nameCap = name[0].toUpperCase() + name.slice(1);
                return (
                    <Med key={`${name}-${index}`}>
                        <div>{nameCap}</div>
                    </Med>
                );
            } 

            return null;      
        });
    };

    const displayWeeklyMed = () => {
        return medications.map((entry) => {
            let { frequency, name, weekly } = entry;

            if (weekly === weekdays[day].toLowerCase()) {
                return (
                    <WeeklyMed key={`${frequency}-${name}`}> 
                        <div>{name}</div>
                    </WeeklyMed>
                );
            }
        })
    };

    const renderList = () => {
        return FREQ_LABELS.map((label, index) => {
            return (
                <FrequencyContainer key={`${label}-${index}`}>
                    <FreqLabel>{label}</FreqLabel>
                    <span>{renderMedName(index)}</span>
                </FrequencyContainer>
            );
        });   
    };

    return (
        <Container>
            <Wrapper>
                <WeeklyMedContainer>
                    <WeeklyMed>Weekly Meds Due: </WeeklyMed>
                    <WeeklyMed>{displayWeeklyMed()}</WeeklyMed>
                </WeeklyMedContainer>
                <DateContainer>
                    <div>
                        <div>{date}</div>
                        <div>{weekdays[day]}</div>
                    </div>
                </DateContainer>
            </Wrapper>
            <ListContainer>
                {renderList()}
            </ListContainer>
        </Container>
    );
};

export default DailyTracker;
