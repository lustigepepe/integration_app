
import React, { useState } from 'react';
import styled from 'styled-components'
import { Label } from '../LabelAndFont';

const ComponentWrapper = styled.div`
    margin-bottom: 10px;
`;

const SelectWrapper = styled.label`
    display: inline-block;
    position: relative;
    width: ${props => (props.width ? props.width : '120px')};
    height: 26px;
    margin: 0 0 -8px ${props => (props.distance ? props.distance : '0px')};
    border-bottom: 1px solid  ;
    padding 0 0 2px 0;
`;


const Select = styled.select`
    font-size: 20px;
    font-weight: 500;
    letter-spacing: .25px;
    width: ${props => (props.width ? props.width : '120px')};
    height: 24px;
    border: none;
    outline: none;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Dropdown = (props) => (
    <ComponentWrapper>
        <Label>
            {props.name}
        </Label>
        <SelectWrapper width={props.width} distance={props.distance}>
            <Select width={props.width}{...props}>
                {props.sspNames.map((x, y) => <option key={y + x}>{x}</option>)};
            </Select>
        </SelectWrapper>
    </ComponentWrapper >
);

export { Dropdown };