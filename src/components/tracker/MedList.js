import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeds, deleteMed } from '../../actions';
import Modal from 'react-modal';
import styled from '@emotion/styled';

const ButtonGroup = styled.div`
    
`;

const EditButton = styled(Link)`
    text-decoration: none;
    color: black;
    cursor: pointer;
    padding: 7px;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 13px;
`;

const ButtonItem = styled.button`
    padding: 7px;
    background: none; 
    cursor: pointer;
    border: 1px solid black;
    border-radius: 10px;
    font-size: 13px;
`;

const CreateButton = styled(Link)`
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    color: #1E2433;
`;

const ContentContainer = styled.div`
    padding-top: 20px;
    width: 80%;
    margin: auto;
`;

const ListContainer = styled.div`
    border: 3px solid #494F5C;
    margin-top: 20px;
`;

const MedRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr 2fr 1fr;
    height: 40px;
    text-align: center;
    border: 1px solid #9FA5A7;
    align-items: center;
    background-color: #fff2f2;
`;

const TopMedRow = styled(MedRow)`
    background-color: #ffd9d9; 
    font-weight: bold;
`;

const RowMenu = styled.span`
    border: 1px solid #9FA5A7;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MedName = styled(Link)`
    color: #1E2433;
    text-decoration: none;
    border: 1px solid #9FA5A7;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Freq = styled(RowMenu)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const DeleteModal = styled(Modal)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const FREQ_LABELS = ["Morning", "Noon", "Evening", "Bedtime"];

const MedList = () => {
    const medications = useSelector(state => Object.values(state.medications));
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [item , setItem] = useState([]);

    useEffect(() => {
        dispatch(fetchMeds());
    }, []);

    if (!medications) {
        return <div>loading...</div>
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const renderMedName = (name) => {
        const nameCap = name[0].toUpperCase() + name.slice(1);
        return (
            <div>
                {nameCap}
            </div>
        );
    };

    const renderFrequency = (frequency) => {
        return FREQ_LABELS.map((label, index) => {
            if (!Array.isArray(frequency)) {
                frequency = [frequency];
            }
            
            const filtered = frequency.filter(freq => freq.label === label);
            if (filtered.length > 0) {
                return (
                    <div key={`${index}-${label}`}>
                        {filtered[0].detail}
                    </div>
                );
            }
            return <div></div>;
        });
    };

    const renderNote = (note) => {
        return (note.length > 30 ? `${note.substring(0, 30)}...` : note )
    };

    const handleDeleteButtonClick = (id) => () => {
        dispatch(deleteMed(id));
        toggleModal();
    };

    const handleClick = (id, name) => () => {
        setItem([id, name]);
        toggleModal();
    };

    const renderButton = (id, name ) => {
        return (
            <ButtonGroup>
                <EditButton to={`/medications/edit/${id}`}>Edit</EditButton>
                <ButtonItem onClick={handleClick(id, name)}>Delete</ButtonItem>
            </ButtonGroup>
        );
    };

    const renderList = () => {
        return medications.map((entry, index) => {
            let { id, name, frequency, note } = entry;

            return (
                <MedRow key={`${name}-${index}`}>
                    <MedName to={`/medications/list/${id}`}>{renderMedName(name)}</MedName>
                    <Freq>{renderFrequency(frequency)}</Freq>
                    <RowMenu>{renderNote(note)}</RowMenu>
                    <RowMenu>{renderButton(id, name)}</RowMenu>
                </MedRow>
            );
        });
    };

    return (
        <ContentContainer>
            <CreateButton to="/medications/new" id="create-button">Create New</CreateButton>
            <ListContainer>
                <TopMedRow>
                    <RowMenu>Name/Strength</RowMenu>
                    <Freq>
                        <span>Morning</span>
                        <span>Noon</span>
                        <span>Evening</span>
                        <span>Bedtime</span>
                    </Freq>
                    <RowMenu>Note</RowMenu>
                    <RowMenu>Action</RowMenu>  
                </TopMedRow>
                <div>
                    {renderList()}
                </div>

            </ListContainer>
            <DeleteModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
            >
                <div>Are you sure you want to delete the medication {item[1]}?</div>

                <ButtonItem onClick={handleDeleteButtonClick(item[0])}>Delete</ButtonItem>
                <br />
                <ButtonItem onClick={toggleModal}>Cancel</ButtonItem>
            </DeleteModal>
        </ContentContainer>
    ); 
};

export default MedList;


