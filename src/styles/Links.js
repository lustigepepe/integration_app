import styled from 'styled-components'
import { Link } from "@reach/router";


// The Button from the last section without the interpolations
const LinkButton = styled(Link)`
    // display: block;
    height: 16px;
    font-weight: 500;
    width: 100%;
    flex: 0 0 30px;
    font-size: 20px;
    letter-spacing: .25px;
    padding: 11px 0 6px;
    background: #1a73e8;
    border: 1px solid transparent;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 15px;
    &:active {
        transform: translateY(4px);
    }
`;

// A new component based on Button, but with some override styles
const LinkButtonSmall = styled(LinkButton)`
    width: 96px;
    padding: 9px 16px 9px 16px;
    margin-left: 5px;
    font-size: 14px;
    white-space: nowrap;
    &:active {
        background-color: #5294eb;
    }
`;

export { LinkButton, LinkButtonSmall };