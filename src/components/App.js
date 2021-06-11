import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import DailyTracker from './tracker/DailyTracker';
import MedList from './tracker/MedList';
import Header from './Header';
import MedCreate from './tracker/MedCreate';
import MedEdit from './tracker/MedEdit';
import MedDetail from './tracker/MedDetail';
import history from '../history';
import styled from '@emotion/styled';
// import pillsImage from './pill.png';
import pillsImage from './medimedi.jpeg';


const Container = styled.div`
    position: relative;   
    height: 100vh;
    width: 100vw;
    font-family: 'Lato', sans-serif;
    ${'' /* background-color: #B5C8C0; */}
    background-image: url(${pillsImage});
    background-size: 100% 100%;
    background-repet: no-repeat;
    @media (max-width: 1000px) {
        width: 1000px;
    }
`;

const App = () => {
    return (
        <Container>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={DailyTracker} />
                        <Route path="/medications/list" exact component={MedList} />
                        <Route path="/medications/new" exact component={MedCreate} />
                        <Route path="/medications/:id" exact component={MedDetail} />
                        <Route path="/medications/edit/:id" exact component={MedEdit} />                      
                    </Switch>
                </div>
            </Router>
        </Container>
    );
};

export default App;