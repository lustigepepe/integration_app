import React, { useState } from 'react';
import styled, { css } from 'styled-components'
import { Label } from '../LabelAndFont';
import { StandardComponentWrapper } from '../Wrapper';

const SliderWrapper = styled.label`
    display: inline-block;
    position: relative;
    width: 60px;
    height: 24px;
    margin: 0 0 -5.5px 0;
    // margin: 0 0 -5.5px 10px;
    @media(max-width: 1439px) {
        margin-left ${props => (props.addSpaceL ? props.addSpaceL : null)}
    }
    @media(max-width: 1650px) {
        margin-top ${props => (props.addSpaceH ? props.addSpaceH : null)}
    }
`;

const Checkbox = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;


const SliderRound = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: .6s;
    transition: .6s;
    border-radius: 24px;
    background-color: ${props => props.bColor};

    &:before {
        border-radius: 50%;
        position: absolute;
        content: "";
        height: 30px;
        width: 30px;
        left: 1px;
        bottom: -3px;
        background-color: F8F8FF;
        background-color: ${props => props.fColor};
        -webkit-transition: .6s;
        -ms-transition: .6s;
        transition:  .6s;
        ${props => props.checked && ({
        '-webkit-transform': 'translateX(27px)',
        '-ms-transform': 'translateX(27px)',
        transform: 'translateX(27px)',
    })}
`;

const Slider = (props) => (
    <StandardComponentWrapper>
        <Label wSpace={props.wSpace} >
            {props.name}
        </Label>
        <SliderWrapper distance={props.distance}  addSpaceH={props.addSpaceH} addSpaceL={props.addSpaceL}>
            <SliderRound bColor={props.checked ? '#6da4ed' : '#ccc'} fColor={props.checked ? '#1a73e8' : '#F8F8FF'} checked={props.checked} />
            <Checkbox type="checkbox" {...props} />
        </SliderWrapper>
    </StandardComponentWrapper >
);

export { Slider };