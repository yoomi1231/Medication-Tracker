import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
    margin: auto;
    width: 80%;
    padding-top: 20px;
`;

const HeaderMenu = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    font-size: 30px;
    border: 1px solid #1E2433;
    border-radius: 10px;
    background-color: #f6f4ec;
`;

const HeaderItem = styled(Link)`
    text-decoration: none;
    color: #1B212F;
    font-weight: bold;  
`;

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderMenu>
                <HeaderItem to="/" className="item">
                    Daily View
                </HeaderItem>
                <HeaderItem to="/medications/list" className="item">
                    Med List
                </HeaderItem>
            </HeaderMenu>
        </HeaderContainer>
    );
};

export default Header;