import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputArea, OutputArea } from '../styles/InputOutputFields';
import { Button, ButtonArea } from '../styles/Buttons';
import { Slider } from '../styles/molecules/Slider';
import { fontSetting } from '../styles/LabelAndFont';
import { ColumnFlexWrapper, SimpleFlexWrapper, WrapAreas } from '../styles/Wrapper';
import { Dropdown } from '../styles/molecules/Dropdown';
import { configGeneration } from '../services/CGenerationService';
import { bidder } from '../services/Helpers';
import { navigate } from "@reach/router";
import { objectToString } from '../services/GlobalFunctions'


const InputField = styled(InputArea)`
    flex: 0 0 49%;
    height: 30vh;
    margin-bottom: 28px;
    margin-top: ${props => props.marginT ? props.marginT : '14px'};
    outline: none;
    @media(max-width: 1363px) {
        flex: 0 0 48%;
    }
    @media(max-width: 550) {
        flex: 0 0 46%;
    }
`;

const ConfigDropdown = styled(Dropdown)`
`;

const InputPageName = styled(InputField)`
    height: 24px;
    resize: none;
    border: none;
    margin-top: 0;
    border-bottom: 1px solid  ;
    padding: 0 0 4.2px;
    border-radius: 0;
    overflow: auto;
    white-space: nowrap;
    font-weight: 500;
    ${fontSetting};
    // @media(max-width: 1402px) {
    //     margin-bottom: 10px;
    // }
`;

const PageNameWrapper = styled.div`
    margin: 20px 0  50px 0;
`;

const DistanceInput = styled.div`
    width: 1%;
`;

const OutputField = styled(OutputArea)`
    height: 30vh;
    padding: 2px 0 0 2px;
`;

const ConfigSetting = styled(SimpleFlexWrapper)`
    justify-content: flex-start;
    justify-content: space-between;
    max-width: 90%;
    @media(max-width: 1439px) {
            flex-flow: column;
            min-width: 229px
    }
`;

const Distance = styled.div`
    height: 100vh;
`;

const ConfigGeneration = (props) => {
    // Declare a new state variable, which we'll call "count"
    const [output, setOutput] = useState("Output");
    const [inConfig, setInConfig] = useState([]);
    const [inSlots, setInSlots] = useState([]);
    const [isClipBChecked, setIsClipBChecked] = useState(true);
    const [isRopChecked, setIsRopChecked] = useState(true);
    const [isCsvGChecked, setIsCsvGChecked] = useState(true);
    const [inSsp, setSsp] = useState('criteo');
    const [inPageName, setInPageName] = useState('');
    const sspNames = [];

    for (let [key, value] of Object.entries(bidder)) {
        sspNames.push(value);
    }

    // CSV data
    const [slotObject, setSlotObject] = useState([]);

    useEffect(() => {
        if (props.location.state.slots)
            setInSlots(props.location.state.slots);
    }, []);

    const inputFromValue = (configString, slotString, pageName) => {
        var _config, _slots;
        var _latePageN = false;
        if (typeof configString === "string") {
            _config = configString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
            _config = _config.replace(/'/g, '"');
            try {
                _config = JSON.parse(_config);
            } catch (ex) {
                alert('Config is not valid JSON \nPlease check the console for more detail');
                console.error(ex);
            }
        }
        if (typeof slotString === "string") {
            _slots = slotString.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
            _slots = _slots.replace(/:([a-zA-Z0-9]+?)/g, ':"$1"');
            _slots = _slots.replace(/'/g, '"');
            try {
                _slots = JSON.parse(_slots);
                setSlotObject(_slots);
            } catch (ex) {
                alert('Slots are not valid JSON \nPlease check the console for more detail');
                console.error(ex);
                return { configData: {}, latePageN: "" };
            }
        }
        if (typeof _slots === "string")
            _slots = null;
        if (typeof _config === "string")
            _config = null;
        if (pageName.length < 1) {
            try {
                _latePageN = true;
                pageName = window.prompt('Please insert page name');
                setInPageName(pageName);
            } catch (ex) {
                console.error(ex);
            }
        }
        return { configData: { config: _config ? _config : [], slots: _slots ? _slots : [], pageName }, latePageN: _latePageN };

    }
    const setClipboard = (outText) => {
        navigator.clipboard.writeText(outText).then(function () {
            console.log("Copied to clipboard successfully!");
        }, function () {
            console.error("Unable to write to clipboard.");
        });
    }
    const generate = (outputOn) => {
        const { configData, latePageN } = inputFromValue(inConfig, inSlots, inPageName);
        if (Object.keys(configData).length === 0 && configData.constructor === Object) {
            return;
        }
        const outText = configGeneration(configData, inSsp, isRopChecked);
        if (outputOn) {
            setOutput(objectToString(JSON.parse(outText)));
            if (isClipBChecked) {
                if (latePageN) {
                    // after windows function prompt it takes a while for using the windows navigator!
                    setTimeout(() => { setClipboard(objectToString(JSON.parse(outText))); }, 200)
                } else {
                    setClipboard(objectToString(JSON.parse(outText)));
                }
            }
        }
        // return 'objectToString(JSON.parse(outText))';
    }

    const toCsv = (output) => {
        var _slots = inSlots.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        _slots = _slots.replace(/'/g, '"');
        try {
            _slots = JSON.parse(_slots);
        } catch (ex) {
            console.error(ex);
            return;
        }
        navigate('csv', { state: { slots: _slots } });
    }

    const generateOrToCsv = (event) => {
        switch (event.target.id) {
            case 'button1':
                generate(true);
                break;
            case 'button2':
                toCsv(generate());
                break;
        }
    }

    return (
        <SimpleFlexWrapper top="50px">
            <WrapAreas>
                <ConfigSetting>
                    <Slider name="ROP" addSpaceL="114px" addSpaceH='4px' checked={isRopChecked} onChange={() => setIsRopChecked(!isRopChecked)} />
                    <Slider name="Save to clipboard" addSpaceH='4px' checked={isClipBChecked} onChange={() => setIsClipBChecked(!isClipBChecked)} />
                    <ConfigDropdown name="Choose SSP" sspNames={sspNames} onChange={(e) => setSsp(e.target.value)} />
                    <div>
                        <InputPageName placeholder="Page name" value={inPageName} onChange={(e) => setInPageName(e.target.value)} />
                    </div>
                </ConfigSetting>
                <SimpleFlexWrapper>
                    <InputField placeholder="Input Config: openX-sizes [...]" marginT='-10px' onChange={(e) => setInConfig(e.target.value)} />
                    < DistanceInput />
                    <InputField placeholder="Input Slots config: [...]" marginT='-10px' value={inSlots} onChange={(e) => setInSlots(e.target.value)} />
                </SimpleFlexWrapper>
                <OutputField style={{ color: (output === "Output") ? " grey" : null }} dangerouslySetInnerHTML={{ __html: output }}></OutputField>
                {/* <Button name={"Generate"} onClick={generate} top="14px" justify="flex-end" /> */}
                <ButtonArea name1={"Generate"} name2={"Data to csv"} color1='#ffc107' onClick={generateOrToCsv} top="14px" justify="flex-end" />

            </WrapAreas>
        </SimpleFlexWrapper>
    );
}

export { ConfigGeneration };
