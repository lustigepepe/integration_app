import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputArea, OutputArea, Warning } from '../styles/InputOutputFields';
// import { Button } from '../styles/Buttons';
import { Slider } from '../styles/molecules/Slider';
import { fontSetting } from '../styles/LabelAndFont';
import { InputText } from '../styles/InputOutputFields';
import { ColumnFlexWrapper, SimpleFlexWrapper, WrapAreas } from '../styles/Wrapper';
import { Dropdown } from '../styles/molecules/Dropdown';
// import { configGenration } from '../services/ConfigGeneration'
import { objectToString, scrollToFirstPriorityWar } from '../services/GlobalFunctions'
import { configGeneration } from '../services/CGenerationService';
import { bidder } from '../services/Helpers';
import { StandardInput } from '../styles/molecules/StandardInput';
import { navigate } from "@reach/router"

import { ButtonElement } from '../styles/Buttons';
import { relative } from 'upath';
import { truncate } from 'fs';
import { transform } from '@babel/core';
const InputField = styled(InputArea)`
    flex: 0 0 ${props => props.height ? props.height : '30%'};
    margin-top: 14px;
    outline: none;
    // @media(max-width: 1363px) {
    //     flex: 0 0 48%;
    // }
    // @media(max-width: 550px) {
    //     flex: 0 0 46%;
    // }
`;

const UnitNameWrapper = styled.div`
    margin: 20px 0  50px 0;
`;

const ButtonArea = (props) => (
    <SimpleFlexWrapper justify={props.justify} top={props.top} style={{ marginBottom: '50px' }} >
        <ButtonElement id='button0' bColor={props.color0} {...props} >{props.name0}</ButtonElement>
        <ButtonElement id='button1' bColor={props.color1} marginL='15px' {...props} >{props.name1}</ButtonElement>
        <ButtonElement id='button2' bColor={props.color2} marginL='15px' {...props} >{props.name2}</ButtonElement>
    </SimpleFlexWrapper>
);

const UnitName = (props) => (
    <UnitNameWrapper>
        <InputText marginLR={props.marginLR} style={{ width: '100%' }} placeholder="Unit name" value={props.value} {...props} />
    </UnitNameWrapper>
);

const InputPageName = styled(InputField)`
    flex: 0 0 150px;
    height: 24px;
    resize: none;
    border: none;
    border-bottom: 1px solid  ;
    padding: 0 0 4.2px;
    margin: 0;
    border-radius: 0;
    overflow: auto;
    white-space: nowrap;
    font-weight: 500;
    ${fontSetting};
    @media(max-width: 1401px) {
        flex: 0 0 10%;
    }
`;

const DistanceInput = styled.div`
    margin-top: 14px;
`;


const OutputField = styled(OutputArea)`
    flex: 0 0 30vh;
    margin-top: 14px;
    padding: 2px 0 0 2px;

`;

const ConfigSetting = styled(SimpleFlexWrapper)`
    justify-content: flex-start;
    justify-content: space-between;
    max-width: 60%;
    @media(max-width: 1624px) {
        max-width: 70%;

    }
    @media(max-width: 1160px) {
        flex-flow: column;
        // min-width: 229px
        max-width: 40px;
    }
`;

const ConfigWrapper = styled.div`
    margin: 50px 0 0 0;
`;

const Distance = styled.div`
    width: 15px;
`;




const SlotsGeneration = () => {
    // Declare a new state variable, which we'll call "count"
    const [output, setOutput] = useState("Output");
    const [isClipBChecked, setIsClipBChecked] = useState(true);
    const [isForConfigGChecked, setIsForConfigGChecked] = useState(true);
    const [unitName, setUnitName] = useState('');
    const [inExpand, setInExpand] = useState('');
    const [priorityLoad, setPriorityLoad] = useState('');
    const [collapseEDiv, setCollapseEDiv] = useState('');
    const [headerBidding, setHeaderBidding] = useState('');
    const [lazyLoad, setLazyLoad] = useState('');
    const [ignore, setIgnore] = useState('');
    const [size, setSize] = useState('');
    const [sizeMapping, setSizeMapping] = useState('');
    const [targeting, setTargeting] = useState('');
    const [slots, setSlots] = useState([]);

    const [warUnitName, setWarUnitName] = useState(false);
    const [warSize, setWarSize] = useState(false);
    const [warInExpand, setWarInExpand] = useState(false);
    const [warPriorityLoad, setWarPriorityLoad] = useState(false);
    const [warCollapseEDiv, setWarCollapseEDiv] = useState(false);
    const [warHeaderBidding, setWarHeaderBidding] = useState(false);
    const [warLazyLoad, setWarLazyLoad] = useState(false);
    const [warIgnore, setWarIgnore] = useState(false);

    const warMap = { UnitName: 1, InExpand: 2, PriorityLoad: 3, CollapseEDiv: 4, HeaderBidding: 5, LazyLoad: 6, Ignore: 7, Size: 8, SizeMapping: 9, Targeting: 10 };
    var exposedWar = [];

    const sspNames = [];
    for (let [key, value] of Object.entries(bidder)) {
        sspNames.push(value);
    }

    const buildUnit = () => {

        const unit = {};
        if (unitName) {
            unit.unit = unitName;
        } if (inExpand) {
            unit.initiallyExpanded = inExpand;
        } if (priorityLoad) {
            unit.priorityLoad = priorityLoad;
        } if (collapseEDiv) {
            unit.collapseEmptyDiv = collapseEDiv;
        } if (headerBidding) {
            unit.headerBidding = headerBidding;
        } if (lazyLoad) {
            unit.lazyLoad = lazyLoad;
        } if (ignore) {
            unit.ignore = ignore;
        } if (size) {
            unit.size = size.replace(/(\r?\n|\r)* (\s)*/g, '');
        }
        if (sizeMapping) {
            unit.sizeMapping = sizeMapping.replace(/(\r?\n|\r)* (\s)*/g, '');
        }
        if (targeting) {
            unit.targeting = targeting.replace(/(\r?\n|\r)* (\s)*/g, '');
        }
        return unit;
    }
    const clearInputs = () => {
        setUnitName('');
        setInExpand('');
        setPriorityLoad('');
        setCollapseEDiv('');
        setHeaderBidding('');
        setLazyLoad('');
        setSize('');
        setSizeMapping('');
        setTargeting('');
        setIgnore('');
    }

    const toSlotsAndOutput = (outputAdded) => {
        var _slots = slots;
        const unit = buildUnit();
        if (Object.keys(unit).length > 0) {
            if (outputAdded) {
                _slots.push(unit)
                setOutput("slots: " + objectToString(_slots));
                // setOutput("slots: " + JSON.stringify(_slots));
                // console.log(objectToString(_slots));
            } else {
                _slots = [unit];
            }
        }
    }

    const isBooleanOrEmpty = (data) => {
        if (data === 'true' || data === 'false' || data === '') {
            return true;
        }
        return false;
    }

    const setClipboard = (outText) => {
        navigator.clipboard.writeText(outText).then(function () {
            console.log("Copied to clipboard successfully!");
        }, function () {
            console.error("Unable to write to clipboard.");
        });
    }

    const setGenerateData = () => {

        if (isForConfigGChecked) {
            if (slots.length == 0)
                navigate('config');
            else
                navigate('config', { state: { slots: objectToString(slots) } });
        } else if (slots.lentgh > 0) {
            setOutput("slots: " + objectToString(slots));
        }
        if (isClipBChecked && slots.lentgh > 0) {
            setClipboard("slots: " + objectToString(slots));
        }
    }

    useEffect(() => {

        if (warUnitName) {
            if (unitName) {
                setWarUnitName(false);
                exposedWar = exposedWar.filter(el => el !== 'UnitName');

            }
        }
        if (warSize) {
            if (size) {
                setWarSize(false);
                exposedWar = exposedWar.filter(el => el !== 'Size');
            }
        }
        if (warInExpand) {
            if (isBooleanOrEmpty(inExpand)) {
                setWarInExpand(false);
                exposedWar = exposedWar.filter(el => el !== 'InExpand');
            }
        }
        if (warPriorityLoad)
            if (isBooleanOrEmpty(priorityLoad)) {
                setWarPriorityLoad(false);
                exposedWar = exposedWar.filter(el => el !== 'PriorityLoad');
            }
        if (warCollapseEDiv) {
            if (isBooleanOrEmpty(collapseEDiv)) {
                setWarCollapseEDiv(false);
                exposedWar = exposedWar.filter(el => el !== 'CollapseEDiv');
            }
        }
        if (warHeaderBidding)
            if (isBooleanOrEmpty(headerBidding)) {
                setWarHeaderBidding(false);
                exposedWar = exposedWar.filter(el => el !== 'HeaderBidding');
            }
        if (warLazyLoad)
            if (isBooleanOrEmpty(lazyLoad)) {
                setWarLazyLoad(false);
                exposedWar = exposedWar.filter(el => el !== 'LazyLoad');
            }
        if (warIgnore)
            if (isBooleanOrEmpty(ignore)) {
                setIgnore(false);
                exposedWar = exposedWar.filter(el => el !== 'Ignore');
            }
    });

    const generateOrAdd = (event) => {
        var isFault = false;
        if (event.target.id === 'button2') {
            if (!unitName && !inExpand && !priorityLoad && !collapseEDiv && !headerBidding && !lazyLoad && !ignore && slots.length > 0) {
                setGenerateData();
            }
        }

        if (event.target.id === 'button1' || (event.target.id === 'button2' && slots.length == 0)) {
            if (!unitName) {
                setWarUnitName(true);
                exposedWar.push('UnitName');
            }
            if (!size) {
                setWarSize(true);
                exposedWar.push('Size');
            }

            if (!size || !unitName)
                isFault = true;


            if (inExpand) {
                if (!isBooleanOrEmpty(inExpand)) {
                    setWarInExpand(true);
                    isFault = true;
                    exposedWar.push('InExpand');
                }
            } if (priorityLoad) {
                if (!isBooleanOrEmpty(priorityLoad)) {
                    setWarPriorityLoad(true);
                    isFault = true;
                    exposedWar.push('PriorityLoad');
                }
            } if (collapseEDiv) {
                if (!isBooleanOrEmpty(collapseEDiv)) {
                    setWarCollapseEDiv(true);
                    isFault = true;
                    exposedWar.push('CollapseEDiv');
                }
            } if (headerBidding) {
                if (!isBooleanOrEmpty(headerBidding)) {
                    setWarHeaderBidding(true);
                    isFault = true;
                    exposedWar.push('HeaderBidding');
                }
            } if (lazyLoad) {
                if (!isBooleanOrEmpty(lazyLoad)) {
                    setWarLazyLoad(true);
                    isFault = true;
                    exposedWar.push('LazyLoad');

                }
            } if (ignore) {
                if (!isBooleanOrEmpty(ignore)) {
                    setWarIgnore(true);
                    isFault = true;
                    exposedWar.push('Ignore');

                }
            }

        }
        if (isFault) {
            scrollToFirstPriorityWar(warMap, exposedWar);
            console.log('test ', isFault);
            return;
        }
        console.log('after test ', isFault);

        switch (event.target.id) {
            case 'button0':
                clearInputs();
                break;
            case 'button1':
                toSlotsAndOutput(true);
                break;
            case 'button2':
                toSlotsAndOutput();
                setGenerateData();
                break;
        }
    }

    return (
        <SimpleFlexWrapper top="50px" >
            <WrapAreas>
                <ConfigWrapper>
                    <ConfigSetting>
                        <Slider name={"Use data for config generation"} addSpaceH='4px' checked={isForConfigGChecked} onChange={() => setIsForConfigGChecked(!isForConfigGChecked)} />
                        <Distance />    <Slider name={"Save to clipboard"} addSpaceH='4px' checked={isClipBChecked} onChange={() => setIsClipBChecked(!isClipBChecked)} />
                    </ConfigSetting>
                </ConfigWrapper>
                <UnitName id='UnitName' marginLR='0' value={unitName} onChange={(e) => setUnitName(e.target.value)} />
                <Warning show={warUnitName} top='-40px' marginB='50px' >Unit name is required</Warning>

                <StandardInput id='InExpand' marginLR='0' width='100%' placeholder="Initially expanded" value={inExpand} onChange={(e) => setInExpand(e.target.value)} />
                <Warning show={warInExpand} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput id='PriorityLoad' marginLR='0' placeholder="Priority load" value={priorityLoad} onChange={(e) => setPriorityLoad(e.target.value)} />
                <Warning show={warPriorityLoad} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput id='CollapseEDiv' marginLR='0' placeholder="Collapse empty div" value={collapseEDiv} onChange={(e) => setCollapseEDiv(e.target.value)} />
                <Warning show={warCollapseEDiv} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput id='HeaderBidding' marginLR='0' placeholder="Header bidding" value={headerBidding} onChange={(e) => setHeaderBidding(e.target.value)} />
                <Warning show={warHeaderBidding} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput id='LazyLoad' marginLR='0' placeholder="Lazy load" value={lazyLoad} onChange={(e) => setLazyLoad(e.target.value)} />
                <Warning show={warLazyLoad} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput id='Ignore' marginLR='0' placeholder="Ignore" value={ignore} onChange={(e) => setIgnore(e.target.value)} />
                <Warning show={warIgnore} marginB='10px' >Only boolean type accepted</Warning>

                <DistanceInput />
                <InputField id='Size' placeholder="Size [...]" height="15%" value={size} onChange={(e) => setSize(e.target.value)} />
                <Warning show={warSize} top='10px' marginB='10px' >Size is required</Warning>
                <InputField id='SizeMapping' placeholder="Size Mapping [...]" value={sizeMapping} onChange={(e) => setSizeMapping(e.target.value)} />
                <InputField id='Targeting' placeholder="Targeting {...}" height="15%" value={targeting} onChange={(e) => setTargeting(e.target.value)} />
                <OutputField style={{ color: (output === "Output") ? " grey" : null }} dangerouslySetInnerHTML={{ __html: output }}></OutputField>
                <ButtonArea name1={"Add Unit"} name0={"Clear"} name2={"Generate"} color0='#ffc107' color1='#218838' onClick={generateOrAdd} top="14px" justify="flex-end" />
            </WrapAreas>
        </SimpleFlexWrapper >
    );
}

export { SlotsGeneration };
