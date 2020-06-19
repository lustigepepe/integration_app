import React, { useState } from 'react';
import { Label } from '../LabelAndFont';
import styled from 'styled-components'
import { StandardComponentWrapper } from '../Wrapper';
import { InputText } from '../InputOutputFields';

const StandardInput = (props) => (
    <StandardComponentWrapper>
        <InputText margin={props.marginLR} style={{ width: props.width ? props.width : '100%' }} placeholder={props.placeholder} value={props.value}{...props} />
    </StandardComponentWrapper >
);


export { StandardInput };