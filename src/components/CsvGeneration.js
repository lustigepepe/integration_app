import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { AddButton } from '../styles/Buttons';
import { InputText, Warning } from '../styles/InputOutputFields';
import { SimpleFlexWrapper, WrapAreas } from '../styles/Wrapper';
import { Button, ButtonElement } from '../styles/Buttons';
import { generateCsv } from '../services/CsvGenerationService';
import { csvPlaceholders } from '../services/Helpers';
import { scrollToFirstPriorityWar } from '../services/GlobalFunctions';


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
            {/* <Warning show={props.warning} top='10px' marginB='10px' >{props.warMessage}</Warning> */}
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
    try {
        for (var _unit in unitMapping) {
            unit = unit.replace(_unit, unitMapping[_unit]);
        }
    } catch (e) {
        console.log(e);
    }
    return unit;
}

const transformSizes = (size) => {
    var resultStr = '';
    if (typeof size === 'string') {
        resultStr = size.charAt(0).toUpperCase() + size.slice(1);
    } else {
        size.forEach((el) => {
            if (!(typeof el === 'string')) {
                resultStr += el[0] + 'x' + el[1] + ',';
            } else {
                resultStr += el.charAt(0).toUpperCase() + el.slice(1) + ',';
            }
        })
    }

    if (resultStr.charAt(resultStr.length - 1) === ',')
        resultStr = resultStr.substr(0, resultStr.length - 1);
    return resultStr;
}

const CsvGeneration = (props) => {
    const [units, dispatch] = useReducer(reducer, [{ unit: '', sizes: '', placement: '', website: '', war: false, }]);
    const [website, setWebsite] = useState('');
    const [unitPrefix, setUnitPrefix] = useState('');
    const [mountDone, setMountDone] = useState(false);
    const [warInUnitPrefix, setWarInUnitPrefix] = useState(false);
    const [warInWebsite, setWarInWebsite] = useState(false);

    const warMap = { InWebsite: 1, InUnitPrefix: 2 };
    var exposedWar = [];

    function reducer(state = [], action) {
        switch (action.type) {
            case 'update':
                return state.map((el, pos) => {
                    if (pos == action.pos) {
                        el[action.dataSet] = action.data[action.dataSet];
                    }
                    return el;
                });
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
            exposedWar.push('InWebsite');
        }
        if (!unitPrefix) {
            setWarInUnitPrefix(true);
            exposedWar.push('InUnitPrefix');

        }
        if (!website || !unitPrefix) {
            if (exposedWar.length > 0)
                scrollToFirstPriorityWar(warMap, exposedWar);
            return;
        }


        var _units = units.map((el) => ({ ...el }));
        var incomplete = false;
        _units.forEach((el, index) => {
            el.website = website;
            if (!(!el.unit && !el.sizes) && (!el.unit || !el.sizes)) {
                const action = { type: 'update', pos: index, dataSet: 'war' };
                const data = { war: true };
                action.data = data;
                dispatch(action);

                exposedWar.push(el.unit);
                incomplete = true;
            }
            el.unit = (unitPrefix + el.unit).trim();
        });

        _units = _units.filter((el, index) => {
            return el.unit && el.sizes;
        });
        if (incomplete) {
            scrollToFirstPriorityWar(warMap, exposedWar);
            return;
        }
        generateCsv(_units);
    }

    useEffect(() => {
        if (warInUnitPrefix)
            if (unitPrefix) {
                setWarInUnitPrefix(false);
                exposedWar = exposedWar.filter(el => el !== 'InUnitPrefix');
            }

        if (warInWebsite)
            if (website) {
                setWarInWebsite(false);
                exposedWar = exposedWar.filter(el => el !== 'InWebsite');
            }

        if (props.location.state.slots && !mountDone) {
            setMountDone(true);
            const slots = props.location.state.slots;
            const _units = [];

            slots.forEach((el, index) => {
                var tempOb = {};
                tempOb.unit = transformUnit(el.unit);
                tempOb.sizes = transformSizes(el.size);
                tempOb.placement = '';
                tempOb.war = false;
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
        const action = { type: 'update', pos: event.target.name, dataSet: (event.target.placeholder !== csvPlaceholders.PLACEMENT ? event.target.placeholder : 'placement').toLowerCase() };
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
        dispatch(action);

        // only for warnings
        if (units[event.target.name].war) {
            const actionWar = { type: 'update', pos: event.target.name, dataSet: 'war' };
            const dataWar = { war: false };
            actionWar.data = dataWar;
            dispatch(actionWar);
        }
    }
    return (
        <SimpleFlexWrapper top="30px">
            <WrapAreas adjust="true">
                <WebStiteInput id='InWebsite' value={website}  /* warning={warInWebsite} warMessage='Website name required' */ placeholder={csvPlaceholders.WEBSITE} onChange={(e) => setWebsite(e.target.value)} />
                <ComponentWrapper>
                    <Warning show={warInWebsite} top='-30px' marginB='10px' >Website name required</Warning>
                </ComponentWrapper>

                <WebStiteInput id='InUnitPrefix' value={unitPrefix} /* warning={warInUnitPrefix} warMessage='Unit prefix required' */ placeholder="Unit 'prefix-'" onChange={(e) => setUnitPrefix(e.target.value)} />
                <ComponentWrapper>
                    <Warning show={warInUnitPrefix} marginB='10px' top='-30px' >Unit prefix required</Warning>
                </ComponentWrapper>

                {units.map((el, index) => (
                    <div key={el + index} >
                        <AddUnits id={el.unit} key={el + index + 'unit'} pos={index} unit={el.unit || ''} sizes={el.sizes || ''} placement={el.placement || ''} onChange={unitChanged} removeUnit={removeUnit} />
                        <Warning key={el + index + 'war'} show={el.war} marginB='10px' top='4px' margin=' 0 0 0 10px' >Check inputs</Warning>
                    </div>
                ))}
                <AddButton justify={'center'} top={'50px'} onClick={addUnit} />
                <GenerateButton name={"Generate"} onClick={generate} top="80px" justify="center" />
            </WrapAreas>
        </SimpleFlexWrapper >
    );
}

export { CsvGeneration };
