import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { InputArea, OutputArea, Warning } from '../styles/InputOutputFields';
=======
import { InputArea, OutputArea } from '../styles/InputOutputFields';
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
// import { Button } from '../styles/Buttons';
import { Slider } from '../styles/molecules/Slider';
import { fontSetting } from '../styles/LabelAndFont';
import { InputText } from '../styles/InputOutputFields';
import { ColumnFlexWrapper, SimpleFlexWrapper, WrapAreas } from '../styles/Wrapper';
import { Dropdown } from '../styles/molecules/Dropdown';
// import { configGenration } from '../services/ConfigGeneration'
import { configGeneration } from '../services/CGenerationService';
import { bidder } from '../services/Helpers';
import { StandardInput } from '../styles/molecules/StandardInput';
import { navigate } from "@reach/router"

import { ButtonElement } from '../styles/Buttons';
import { relative } from 'upath';
import { truncate } from 'fs';
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
        <ButtonElement id='button1' bColor={props.color1} {...props} >{props.name1}</ButtonElement>
        <ButtonElement id='button2' bColor={props.color2} marginL='15px' {...props} >{props.name2}</ButtonElement>
    </SimpleFlexWrapper>
);

const UnitName = (props) => (
    <UnitNameWrapper>
        <InputText marginLR={props.marginLR} style={{ width: '100%' }} placeholder="Unit name" {...props} />
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

<<<<<<< HEAD
=======
const Warning = styled.div`
    position: relative;
    margin-bottom: ${props => props.marginB ? props.marginB : '0px'};
    &::after{
        position: absolute;
    }
    top: ${props => props.top ? props.top : '0px'};
    font-weight: 900;
    ${fontSetting};
    color: #c82333;
    background-color: #e0abb0;
    border-radius: 4px;
    padding: 2px 0 2px 4px;
    display: ${props => props.show ? 'block' : 'none'};
`;

>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155

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
<<<<<<< HEAD
            unit.size = size.replace(/(\r?\n|\r)* (\s)*/g, '');
        }
        if (sizeMapping) {
            unit.sizeMapping = sizeMapping.replace(/(\r?\n|\r)* (\s)*/g, '');
        }
        if (targeting) {
            unit.targeting = targeting.replace(/(\r?\n|\r)* (\s)*/g, '');
=======
            unit.size = size;
        }
        if (sizeMapping) {
            unit.sizeMapping = sizeMapping;
        }
        if (targeting) {
            unit.targeting = targeting;
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        }
        return unit;
    }

    const addToSlotsAndOutput = (ouput) => {
        const _slots = slots;
        const unit = buildUnit();
        if (Object.keys(unit).length > 0) {
            _slots.push(unit)
            if (output)
<<<<<<< HEAD
                setOutput("slots: " + JSON.stringify(_slots));
=======
                setOutput("slots: " + _slots.slots);
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        }
    }

    const isBoolean = (data) => {
        if (data === 'true' || data === 'false') {
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
            navigate('config', { state: { slots: slots } });
        } else {
<<<<<<< HEAD
            setOutput("slots: " + JSON.stringify(slots));
        }
        if (isClipBChecked) {
            setClipboard("slots: " + JSON.stringify(slots));
=======
            setOutput("slots: " + slots);
        }
        if (isClipBChecked) {
            setClipboard("slots: " + slots);
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        }
    }

    useEffect(() => {
        if (warUnitName) {
            if (unitName)
                setWarUnitName(false);
        }
        if (warSize) {
            if (size)
                setWarSize(false);
        }
        if (warInExpand) {
            if (isBoolean(inExpand)) {
                setWarInExpand(false);
            }
        }
        if (warPriorityLoad)
            if (isBoolean(priorityLoad))
                setWarPriorityLoad(false);
        if (warCollapseEDiv)
            if (isBoolean(collapseEDiv))
                setWarCollapseEDiv(false);
        if (warHeaderBidding)
            if (isBoolean(headerBidding))
                setWarHeaderBidding(false);
        if (warLazyLoad)
            if (isBoolean(lazyLoad))
                setWarLazyLoad(false);
        if (warIgnore)
            if (isBoolean(ignore))
                setIgnore(false);

    });

    const generateOrAdd = (event) => {
        var isFault = false;

        if (!unitName)
            setWarUnitName(true);
        if (!size)
            setWarSize(true);

        if (!size || !unitName)
            isFault = true;

        if (inExpand) {
            console.log('inBoolean ööö', isBoolean(inExpand));
            if (!isBoolean(inExpand)) {
                setWarInExpand(true);
                isFault = true;
            }
        } if (priorityLoad) {
            if (!isBoolean(priorityLoad)) {
                setWarPriorityLoad(true);
                isFault = true;
            }
        } if (collapseEDiv) {
            if (!isBoolean(collapseEDiv)) {
                setWarCollapseEDiv(true);
                isFault = true;
            }
        } if (headerBidding) {
            if (!isBoolean(headerBidding)) {
                setWarHeaderBidding(true);
                isFault = true;
            }
        } if (lazyLoad) {
            if (!isBoolean(lazyLoad)) {
                setWarLazyLoad(true);
                isFault = true;

            }
        } if (ignore) {
            if (!isBoolean(ignore)) {
                setWarIgnore(true);
                isFault = true;

            }
        }

        if (isFault) return;
<<<<<<< HEAD
=======

>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
        switch (event.target.id) {
            case 'button1':
                addToSlotsAndOutput(true);
                break;
            case 'button2':
                addToSlotsAndOutput();
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
                <UnitName marginLR='0' onChange={(e) => setUnitName(e.target.value)} />
<<<<<<< HEAD
                <Warning show={warUnitName} top='-40px' marginB='50px' >Unit name is required</Warning>
=======
                <Warning show={warUnitName} top='-40px'>Unit name is required</Warning>
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155

                <StandardInput marginLR='0' width='100%' placeholder="Initially expanded" onChange={(e) => setInExpand(e.target.value)} />
                <Warning show={warInExpand} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput marginLR='0' placeholder="Priority load" onChange={(e) => setPriorityLoad(e.target.value)} />
                <Warning show={warPriorityLoad} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput marginLR='0' placeholder="Collapse empty div" onChange={(e) => setCollapseEDiv(e.target.value)} />
                <Warning show={warCollapseEDiv} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput marginLR='0' placeholder="Header bidding" onChange={(e) => setHeaderBidding(e.target.value)} />
                <Warning show={warHeaderBidding} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput marginLR='0' placeholder="Lazy load" onChange={(e) => setLazyLoad(e.target.value)} />
                <Warning show={warLazyLoad} marginB='10px' >Only boolean type accepted</Warning>

                <StandardInput marginLR='0' placeholder="Ignore" onChange={(e) => setIgnore(e.target.value)} />
                <Warning show={warIgnore} marginB='10px' >Only boolean type accepted</Warning>

                <DistanceInput />
<<<<<<< HEAD
                <InputField placeholder="Size [...]" height="15%" onChange={(e) => setSize(e.target.value)} />
                <Warning show={warSize} top='10px' marginB='10px' >Size is required</Warning>
                <InputField placeholder="Size Mapping [...]" onChange={(e) => setSizeMapping(e.target.value)} />
                <InputField placeholder="Targeting {...}" onChange={(e) => setTargeting(e.target.value)} />
=======
                <InputField placeholder="Size" height="15%" onChange={(e) => setSize(e.target.value)} />
                <Warning show={warSize} top='10px' marginB='10px' >Size is required</Warning>
                <InputField placeholder="Size Mapping" onChange={(e) => setSizeMapping(e.target.value)} />
                <InputField placeholder="Targeting" onChange={(e) => setTargeting(e.target.value)} />
>>>>>>> 40ed32c001db368c4c94c51ed56f57e7b55fd155
                <OutputField style={{ color: (output === "Output") ? " grey" : null }} dangerouslySetInnerHTML={{ __html: output }}></OutputField>
                <ButtonArea name1={"Add Unit"} name2={"Generate"} color1='#ffc107' onClick={generateOrAdd} top="14px" justify="flex-end" />
            </WrapAreas>
        </SimpleFlexWrapper >
    );
}

export { SlotsGeneration };
