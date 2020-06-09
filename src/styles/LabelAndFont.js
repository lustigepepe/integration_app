import styled, { css } from 'styled-components'


export const fontSetting = css`
    font-size: 20px;
    letter-spacing: .25px;
`

export const Label = styled.span`
    white-space: nowrap;
    margin-right: 10px;
    ${fontSetting};
 `;