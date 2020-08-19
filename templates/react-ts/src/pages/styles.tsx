import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        font-size: 60.2%;
    }

    html, body, #root {
        height: 100vh;
        background: #faf;
        font-size: 2rem;
        font-family: Arvo;
        font-weight: 200;
    }

`;

export const Container = styled.div`
    margin: 0 auto;
    max-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
`;