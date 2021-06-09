import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { fetchMed, deleteMed } from '../../actions';

const MedDelete = (props) => {
    const dispatch = useDispatch();
    const medication = useSelector(state => state.medications[props.match.params.id]);

    useEffect(() => {
        dispatch(fetchMed(props.match.params.id))
    }, []);

    const renderContent = () => {
        if (!medication) {
            return 'Are you sure you want to delete this?'
        }

        return `are you sure you want to delete the medication with name: ${medication.name}`
    };

    const renderActions = () => {
        const id = props.match.params.id;

        return (
            <React.Fragment>
                <button onClick={() => dispatch(deleteMed(id))}>Delete</button>
                <Link to='/medications/list'>Cancel</Link>
            </React.Fragment>
        );
    };

    return (
        <div>
            <Modal>
                <div>Delete a Medication</div>
                <div>{renderContent()}</div>
                <div>{renderActions()}</div>                
            </Modal>   
        </div>
    );
};

export default MedDelete;

