import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body} !important;
    color: ${({ theme }) => theme.text} !important;
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .productstables tr:nth-child(even){background-color: ${({ theme }) => theme.body}}
  .productstables tr:nth-child(even){filter: brightness(${({ theme }) => theme.brightness})}
  .productstables tr:nth-child(odd){background-color: ${({ theme }) => theme.body}}
  `