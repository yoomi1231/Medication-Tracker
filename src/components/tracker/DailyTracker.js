import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeds } from '../../actions';
import styled from '@emotion/styled';
import _ from 'lodash';

const FrequencyContainer = styled.div`
    margin: 10px 0;
    height: 140px;
    border: 5px solid #9FA5A7;
    border-radius: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: ${props => props.colorDisplay};
  
    @media (max-width: 600px) {
        height: 200px;
        width: 400px;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
    }
`;

const TextDisplay = styled.span`
    visibility: ${props => props.textDisplay};
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

const Med = styled.div`
`;

const ListContainer = styled.div`
    width: 80%;
`;

const FREQ_LABELS = ["Morning", "Noon", "Evening", "Bedtime"];
const weekdays = [
    "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
];
    
const DailyTracker = () => {
    const today = new Date();
    const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    const day = today.getDay();
    const medications = useSelector(state => Object.values(state.medications));
    const dispatch = useDispatch();


    const data = localStorage.getItem('data');
    const initial = data ? JSON.parse(data) : [];
    const [taken, setTaken] = useState(initial);

    const dateData = localStorage.getItem('dateData');
    const initialDate = dateData ? JSON.parse(dateData) : '';
    const [dateTaken, setDateTaken] = useState(initialDate);


    const [todayDate, setTodayDate] = useState(date);
        
    useEffect(() => {
        dispatch(fetchMeds());
        setTodayDate(date);

        // const data = localStorage.getItem('data');
        // if (data) {
        //     setTaken(JSON.parse(data))
        // };

        // const dateData = localStorage.getItem('dateData');
        // if (dateData) {
        //     setDateTaken(JSON.parse(dateData))
        // };


    }, [setTodayDate, date, dispatch]);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(taken));
        localStorage.setItem('dateData', JSON.stringify(dateTaken));
    }, [taken, dateTaken]);

    if (medications.length === 0) {
        return <div>loading...</div>
    };

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

            return "";      
        });
    };
    console.log(day)

    const displayWeeklyMed = () => {
        let meds = [];
        medications.forEach((entry) => {
            let { frequency, name, weekly } = entry;

            if (weekly === weekdays[day].toLowerCase()) {
                meds.push(
                    <WeeklyMed key={`${frequency}-${name}`}> 
                        <div>{name}</div>
                    </WeeklyMed>
                );
            } 
        });

        return meds.length === 0 ? (
            <WeeklyMed key='no-meds'> 
                <div>None</div>
            </WeeklyMed>
        ) : meds;
    };

    const markTaken = (index) => {
        setDateTaken(date);
        setTaken([...taken, index]);
    };

    if (dateTaken !== todayDate) {
        localStorage.clear();
    };

    const renderList = () => {
        return FREQ_LABELS.map((label, index) => {
            return (
                <FrequencyContainer 
                    key={`${label}-${index}`} 
                    onClick={() => markTaken(index)}
                    colorDisplay={taken.indexOf(index) > -1 ? "pink" : "#fff2f2"}
                >
                    <FreqLabel>
                        <TextDisplay
                            textDisplay={taken.indexOf(index) > -1 ? "visible" : "hidden"}
                        >
                            ✓  
                        </TextDisplay> 
                        <div>{label}</div>
                    </FreqLabel>
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
