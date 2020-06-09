import styled from 'styled-components'
<<<<<<< HEAD
import { fontSetting } from './LabelAndFont';
=======

>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155

const InputArea = styled.textarea`
    border: 2px solid #1a73e8;
    border-radius: 4px;
    font-size: 14px;

`;

const OutputArea = styled.div`
    border: 2px solid #1a73e8;
    border-radius: 4px;
    font-size: 14px;
    overflow: scroll;

`;

const InputText = styled.input`
    flex: 1 1;
    outline: none;
    border: none;
    border-bottom: 1px solid  #202024;
    // font-size: 14px;
    font-size: 20px;
    margin: 0 ${props => props.marginLR ? props.marginLR : '1%'};
    padding:  2px 0px ;
    height: 22px;
    placeholder: ${props => props.placeholder ? props.placeholder : ''};
    width: ${props => props.width ? props.width : null};
    `;

<<<<<<< HEAD
const Warning = styled.div`
    position: relative;
    margin-bottom: ${props => props.marginB ? props.marginB : '0px'};
    &::after{
        position: absolute;
    }
    margin-top: ${props => props.top ? props.top : '0px'};
    font-weight: 900;
    ${fontSetting};
    color: #c82333;
    background-color: #e0abb0;
    border-radius: 4px;
    padding: 2px 4px;
    display: ${props => props.show ? 'block' : 'none'};
`;

export { InputArea, OutputArea, InputText, Warning }
=======

export { InputArea, OutputArea, InputText }
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
