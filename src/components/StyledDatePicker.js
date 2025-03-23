// src/styles/DatePickerGlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const DatePickerGlobalStyles = createGlobalStyle`
    /* Style de l'input */
    .react-datepicker-wrapper .react-datepicker__input-container input {
        width: 100%;
        padding: 1rem;
        background-color: ${(props) => props.theme.body};
        border: 2px solid ${(props) => props.theme.grey};
        border-radius: 0.375rem;
        color: ${(props) => props.theme.text};
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .react-datepicker-wrapper {
        width: 94%;
    
    }
    .react-datepicker-wrapper .react-datepicker__input-container input:focus {
        border-color: ${(props) => props.theme.text};
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    }

    /* Style de la popup */
    .react-datepicker {
        background-color: ${(props) => props.theme.body};
        border: 1px solid ${(props) => props.theme.grey};
        border-radius: 0.375rem;
        color: ${(props) => props.theme.text};
    }
    .react-datepicker__header {
        background-color: ${(props) => props.theme.body};
        border-bottom: 1px solid ${(props) => props.theme.grey};
        padding: 0.5rem;
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
    }
    .react-datepicker__current-month {
        color: ${(props) => props.theme.text};
        font-size: 1rem;
        font-weight: 500;
    }

    /* Forcer les noms des jours et le label TIME en blanc */
    .react-datepicker__day-name,
    .react-datepicker__time-text {
        color: white !important;
    }

    .react-datepicker__day {
        width: 2.5rem;
        height: 2.5rem;
        line-height: 2.5rem;
        margin: 0.2rem;
        color: ${(props) => props.theme.text};
        transition: background-color 0.2s ease;
    }
    .react-datepicker__day:hover {
        background-color: white !important;
        color: black !important;
        border-radius: 0.375rem;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
        background-color: ${(props) => props.theme.text};
        color: ${(props) => props.theme.body};
        border-radius: 0.375rem;
    }

    /* Styles pour la section heures */
    .react-datepicker__time-container {
        background-color: ${(props) => props.theme.body} !important;
        border-left: 1px solid ${(props) => props.theme.grey} !important;
    }
    .react-datepicker__time .react-datepicker__time-box {
        background-color: black !important;
        color: white !important;
    }
    .react-datepicker__time .react-datepicker__time-box li {
        color: white !important;
        line-height: 2rem !important;
        padding: 0.25rem 0.5rem;
    }
    .react-datepicker__time-box li:hover{
        color: black !important;
    }
    .react-datepicker-time__header{
        color: white;
    }
`;

export default DatePickerGlobalStyles;
