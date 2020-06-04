import React, { useState } from 'react';
import { Router, Link } from "@reach/router";
import { LinkButton } from '../styles/Links'
import styled from 'styled-components'

const AdjustHome = styled.div`
    padding: 0 15%;
    display: flex;
    // justify-content: space-between;
    justify-content: center;
    margin-top: 10em;
    //width: 100%;
`;

const HomeContainer = styled.div`
    margin-top: 8%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 60%;

`;

const HomeLinkButton = styled(LinkButton)`
    // flex 0 0 30%;
    // padding: 15vh 0;

`;

const Home = () => {
    return (
        <AdjustHome>
            <HomeContainer>
                <HomeLinkButton to="slots">Slots Generation</HomeLinkButton>
                <HomeLinkButton to="csv">Csv Generation</HomeLinkButton>
                <HomeLinkButton to="config">Config Generation</HomeLinkButton>
            </HomeContainer>
        </AdjustHome >
    );
}

export { Home };
