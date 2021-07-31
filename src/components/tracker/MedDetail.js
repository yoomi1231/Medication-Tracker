import React, { useEffect }  from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { fetchMed } from '../../actions';
import Accordion from '../Accordion';
import styled from '@emotion/styled';

const Container = styled.div`
    width: 80%;
    margin: auto;
    padding-top: 20px;
`;

const CloseButton = styled(Link)`
    text-decoration: none;
    color: black;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    background-color: #DCE1E7;
`;

const Content = styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
`;

const Message = styled.p`
    width: 80%;
    margin: auto;
    padding-top: 20px;
`;

const MedDetail = (props) => {
    const dispatch = useDispatch();
    const medication = useSelector(state => _.get(state.medications, [props.match.params.id], ""));

    useEffect(() => {
        dispatch(fetchMed(props.match.params.id))
    }, [dispatch, props.match.params.id]);

    const [{ data, loading, error }] = useAxios(
        `https://api.fda.gov/drug/label.json?api_key=bqONWlP20duVonhNUJ5YO6xukgeqjRyLH9M75ajd&search=openfda.brand_name:"${medication.name}"`  
    )

    if (loading) return <Message>Loading...</Message>
    if (error) return <Message>Unable to search this medication. Please check the name.</Message> 

    const items = [
        {
            title: 'Dosage and Administration',
            content: JSON.stringify(_.get(data, "results[0].dosage_and_administration[0]", ""), null, 2).replace(/"/g, "") || ''
        },
        {
            title: 'Adverse Reactions',
            content: JSON.stringify(_.get(data, "results[0].adverse_reactions[0]", "") , null, 2).replace(/"/g, "")
        },
        {
            title: 'Contraindications',
            content: JSON.stringify(_.get(data, "results[0].contraindications[0]", "") , null, 2).replace(/"/g, "")
        },
        {
            title: 'Mechanism of Action',
            content: JSON.stringify(_.get(data, "results[0].mechanism_of_action[0]", "") , null, 2).replace(/"/g, "")
        },
        {
            title: 'Indication and Usage',
            content: JSON.stringify(_.get(data, "results[0].indications_and_usage[0]", "") , null, 2).replace(/"/g, "")
        },
        {
            title: 'Boxed Warning',
            content: JSON.stringify(_.get(data, "results[0].boxed_warning[0]", "") , null, 2).replace(/"/g, "")
        },
        {
            title: 'Warnings and Cautions',
            content: JSON.stringify(_.get(data, "results[0].warnings_and_cautions", "") , null, 2).replace(/"/g, "")
        }
    ];


    return (
        <Container>
            <CloseButton to="/medications/list">close</CloseButton>
            <Content>
                <div>Brand Name: {JSON.stringify(data.results[0].openfda.brand_name[0], null, 2).replace(/"/g, "")}</div>
                <div>Generic Name: {JSON.stringify(data.results[0].openfda.generic_name[0], null, 2).replace(/"/g, "")}</div>
                <div>Note: {medication.note}</div>
            </Content>
            <Accordion items={items} />
        </Container>
    );
};

export default MedDetail;