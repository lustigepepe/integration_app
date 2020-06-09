import styled from 'styled-components'


const SimpleFlexWrapper = styled.div`
    display: flex;
    justify-content: ${props => props.justify ? props.justify : 'center'};
    width: 100%;
    margin-top: ${props => props.top ? props.top : 0};
`;

const ColumnFlexWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
`;

const WrapAreas = styled(ColumnFlexWrapper)`
    width:  60%;
    transition: width .7s ease-in-out;
    @media(max-width: 990px) {
        width: ${props => props.adjust ? '90%' : '60%'};
    }
`;

const StandardComponentWrapper = styled.div`
    margin: 0 0 10px 0;
`;


export { ColumnFlexWrapper, SimpleFlexWrapper, WrapAreas, StandardComponentWrapper };
