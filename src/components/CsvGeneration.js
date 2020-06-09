<<<<<<< HEAD
import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { AddButton } from '../styles/Buttons';
import { InputText, Warning } from '../styles/InputOutputFields';
=======
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddButton } from '../styles/Buttons';
import { InputText } from '../styles/InputOutputFields';
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
import { SimpleFlexWrapper, WrapAreas } from '../styles/Wrapper';
import { Button, ButtonElement } from '../styles/Buttons';
import { generateCsv } from '../services/CsvGenerationService';
import { csvPlaceholders } from '../services/Helpers';


const unitMapping = {
    "background": "bg",
    "layer": "lay",
    "leaderboard": "lb",
    "billboard": "bb",
    "sky-left": "sky-left",
    "sky-right": "sky-right",
    "special-unit": "su",
    "medrect": "mr",
    "teaser": "tsr",
    "above-the-article": "ata",
    "below-the-article": "bta",
    "post-site-ad": "psa",
    "popunder": "pu",
    "interstitial": "int"

};

Object.freeze(unitMapping);


const colBreakPoint = '801px';
// Minus button - -
const ComponentWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0 ;
`;


const ComponentUnitWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
<<<<<<< HEAD

=======
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
const InputWrapper = styled.div`
`;

const ResetButton = styled(ButtonElement)`
    background-color: #dc3545;
    padding: 2px 8px ;
    margin-left: 25px;
    border-color: #dc3545;
    @media(max-width: ${colBreakPoint}) {
      padding: 0;
      margin:0;
      height: 28px;
    }
`;

const UnitInput = styled(InputText)`
   margin-bottom:  10px;
`;

const WebStiteInput = (props) => (
    <ComponentWrapper>
        <InputWrapper >
            <InputText placeholder={props.placeholder} width={props.width} value={props.value} {...props} />
<<<<<<< HEAD
            {/* <Warning show={props.warning} top='10px' marginB='10px' >{props.warMessage}</Warning> */}
=======
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        </InputWrapper>
    </ComponentWrapper>
);

const UnitWrapper = styled(SimpleFlexWrapper)`
    @media(max-width: ${colBreakPoint}) {
        flex-flow: column;
        justify-content: center;
        width: 60%;
    }
`;

const ButtonWrapper = styled(SimpleFlexWrapper)`
    @media(max-width: ${colBreakPoint}) {
        margin-top: 50px;
    }
`;

const GenerateButton = (props) => (
    <ButtonWrapper justify={props.justify} top={props.top} >
        <ButtonElement bColor={props.bColor} {...props} >{props.name}</ButtonElement>
    </ButtonWrapper>
);

const AddUnits = (props) => (
    <ComponentUnitWrapper>
        <UnitWrapper top="20px" justify="space-between" >
            <UnitInput name={props.pos} placeholder={csvPlaceholders.UNIT} value={props.unit} {...props} />
            <UnitInput name={props.pos} placeholder={csvPlaceholders.SIZES} value={props.sizes} {...props} />
            <UnitInput name={props.pos} placeholder={csvPlaceholders.PLACEMENT} value={props.placement}   {...props} />
            <ResetButton name={props.pos} onClick={props.removeUnit}{...props}> Delete  </ResetButton>
        </UnitWrapper>
    </ComponentUnitWrapper>
);

const transformUnit = (unit) => {
<<<<<<< HEAD
    try {
        for (var _unit in unitMapping) {
            unit = unit.replace(_unit, unitMapping[_unit]);
=======


    try {
        for (var unit in unitMapping) {
            unit = unit.replace(unit, unitMapping[unit]);
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        }
    } catch (e) {
        console.log(e);
    }
<<<<<<< HEAD
=======

    console.log('ooo: ', unit);

>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
    return unit;
}

const transformSizes = (size) => {
<<<<<<< HEAD
    var resultStr = '';
    if (typeof size === 'string') {
        resultStr = size.charAt(0).toUpperCase() + size.slice(1);
=======


    var resultStr = '';
    if (typeof size === 'string') {
        resultStr = size;

>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
    } else {
        size.forEach((el) => {
            if (!(typeof el === 'string')) {
                resultStr += el[0] + 'x' + el[1] + ',';
<<<<<<< HEAD
            } else {
                resultStr += el.charAt(0).toUpperCase() + el.slice(1) + ',';
=======
                console.log('resultStr0', el[0]);

            } else {
                resultStr += el + ',';
                console.log('resultStr', el);
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
            }
        })
    }

    if (resultStr.charAt(resultStr.length - 1) === ',')
        resultStr = resultStr.substr(0, resultStr.length - 1);
<<<<<<< HEAD
    return resultStr;
}

const CsvGeneration = (props) => {
    const [units, dispatch] = useReducer(reducer, [{ unit: '', sizes: '', placement: '', website: '' }]);
    const [website, setWebsite] = useState('');
    const [unitPrefix, setUnitPrefix] = useState('');
    const [mountDone, setMountDone] = useState(false);

    const [warInUnitPrefix, setWarInUnitPrefix] = useState(false);
    const [warInWebsite, setWarInWebsite] = useState(false);

    function reducer(state = [], action) {
        switch (action.type) {
            case 'update':
                return state.map((el, pos) => { return pos != action.pos ? el : action.data });
            case 'add':
                return [...state, action.data];
            case 'delete':
                state.filter((el, pos) => {
                    return pos !== action.pos
                });
                return state.filter((el, pos) => { return pos != action.pos });
            case 'setAll':
                return action.data;
            default:
                throw new Error('wrong action type');
        }
    }

    const generate = () => {
        if (!website) {
            setWarInWebsite(true);
        }
        if (!unitPrefix) {
            setWarInUnitPrefix(true);
        }
        if (!website || !unitPrefix)
            return;
=======


    return resultStr;
}


const CsvGeneration = (props) => {
    const [units, setUnits] = useState([{ unit: '', sizes: '', placement: '', website: '' }]);
    const [website, setWebsite] = useState('');
    const [unitPrefix, setUnitPrefix] = useState('');

    const generate = () => {
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        units.forEach(el => {
            el.website = website;
            el.unit = (unitPrefix + el.unit).trim();
        });
        generateCsv([...units]);
    }
<<<<<<< HEAD
    useEffect(() => {
        if (warInUnitPrefix)
            if (unitPrefix)
                setWarInUnitPrefix(false);

        if (warInWebsite)
            if (website)
                setWarInWebsite(false);

        if (props.location.state.slots && !mountDone) {
            setMountDone(true);
            const slots = props.location.state.slots;
            const _units = [];

            slots.forEach((el, index) => {
=======

    useEffect(() => {

        if (props.location.state.slots) {
            const slots = props.location.state.slots;
            const _units = [];
            slots.forEach((el, index) => {
                // const [units, setUnits] = useState([{ unit: '', sizes: '', placement: '', website: '' }]);
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
                var tempOb = {};
                tempOb.unit = transformUnit(el.unit);
                tempOb.sizes = transformSizes(el.size);
                tempOb.placement = '';
<<<<<<< HEAD
                _units.push(tempOb);
            });
            dispatch({ type: 'setAll', data: _units });
        }
    });

    const removeUnit = (event) => {
        dispatch({ type: 'delete', pos: event.target.name });
    }

    const addUnit = (event) => {
        dispatch({ type: 'add', data: { unit: '', sizes: '', placement: '' } })
    }

    const unitChanged = (event) => {
        const action = { type: 'update', pos: event.target.name };
        const data = {};
        switch (event.target.placeholder) {
            case csvPlaceholders.UNIT:
                data.unit = event.target.value;
                break;
            case csvPlaceholders.SIZES:
                data.sizes = event.target.value;
                break;
            case csvPlaceholders.PLACEMENT:
                data.placement = event.target.value;
        }
        action.data = data;
        dispatch(action)
=======

                _units.push(tempOb);
            });
            console.log('kkk: ', ' ', _units);
            setUnits(_units);
        }
    }, []);

    const removeUnit = (event) => {
        const _units = [];
        for (var unitTemp in units) {
            if (unitTemp === event.target.name) {
                continue;
            } else {
                _units.push(units[unitTemp]);
            }
        }
        setUnits(_units);
    }

    const addUnit = (event) => {
        var _units = [...units];
        _units.push({ unit: '', sizes: '', placement: '' });
        setUnits(_units);
    }

    const unitChanged = (event) => {
        var _unit = units[event.target.name];

        // var unitsSt = JSON.stringify(units);
        // var _units = JSON.parse(unitsSt);
        // var _unit = _units[event.target.name];
        // console.log('units', units, 'name', event.target.name);
        switch (event.target.placeholder) {
            case csvPlaceholders.UNIT:
                _unit.unit = event.target.value;
                break;
            case csvPlaceholders.SIZES:
                _unit.sizes = event.target.value;
                break;
            case csvPlaceholders.PLACEMENT:
                _unit.placement = event.target.value;
                break;
            case csvPlaceholders.PREFIX:

        }
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
    }
    return (
        <SimpleFlexWrapper top="30px">
            <WrapAreas adjust="true">
<<<<<<< HEAD
                <WebStiteInput value={website}  /* warning={warInWebsite} warMessage='Website name required' */ placeholder={csvPlaceholders.WEBSITE} onChange={(e) => setWebsite(e.target.value)} />
                <ComponentWrapper>
                    <Warning show={warInWebsite} top='-30px' marginB='10px' >Website name required</Warning>
                </ComponentWrapper>

                <WebStiteInput value={unitPrefix} /* warning={warInUnitPrefix} warMessage='Unit prefix required' */ placeholder="Unit 'prefix-'" onChange={(e) => setUnitPrefix(e.target.value)} />
                <ComponentWrapper>
                    <Warning show={warInUnitPrefix} marginB='10px' top='-30px' >Unit prefix required</Warning>
                </ComponentWrapper>

                {units.map((el, index) => (
                    <AddUnits key={el + index} pos={index} unit={el.unit || ''} sizes={el.sizes || ''} placements={el.placements || ''} onChange={unitChanged} removeUnit={removeUnit} />
=======
                <WebStiteInput value={website} placeholder={csvPlaceholders.WEBSITE} onChange={(e) => setWebsite(e.target.value)} />
                <WebStiteInput value={unitPrefix} placeholder='Unit prefix' onChange={(e) => setUnitPrefix(e.target.value)} />
                {units.map((ele, index) => (
                    <AddUnits key={ele + index} pos={index} /* unit={unit} sizes={sizes} placements={placements} */ onChange={unitChanged} removeUnit={removeUnit} />
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
                ))}
                <AddButton justify={'center'} top={'50px'} onClick={addUnit} />
                <GenerateButton name={"Generate"} onClick={generate} top="80px" justify="center" />
            </WrapAreas>
        </SimpleFlexWrapper>
    );
}

export { CsvGeneration };
