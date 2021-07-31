import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    border: 1px solid black;
`;

const Title = styled.div`
    padding: 10px;
    cursor: pointer;
    display: ${props =>
        props.active ? 'none': ''};
`;

const Content = styled.div`
    padding: 10px;
    display: ${props => 
        props.active ? '': 'none'};
    background-color: #DCE1E7;
`;

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    
    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {
        const active = index === activeIndex ? 'active' : '';
        return (
            <Container key={`${item}-${index}`}>
                <Title active={active} onClick={() => onTitleClick(index)}>
                    {item.title}
                </Title>
                <Content active={active}>
                    {item.content}
                </Content>
            </Container>
        );
    });

    return (
        <div>
            {renderedItems}
        </div>
    );
};

export default Accordion;
