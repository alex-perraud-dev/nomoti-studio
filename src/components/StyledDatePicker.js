import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Garde les styles de base (pour l’animation, etc.)

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.text};
  }

  /* Cacher le triangle du calendrier */
  .react-datepicker__triangle {
    display: none;
  }

  /* Style de l’en-tête du calendrier */
  .react-datepicker__header {
    background-color: ${(props) => props.theme.body};
    border-bottom: 1px solid ${(props) => props.theme.text};
  }

  /* Style du mois affiché dans l’en-tête */
  .react-datepicker__current-month {
    font-size: 1.2rem;
    color: ${(props) => props.theme.text};
  }

  /* Style des jours */
  .react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    margin: 0.2rem;
  }

  /* Style du jour sélectionné */
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    border-radius: 50%;
  }

  /* Optionnel : style lors du survol des jours */
  .react-datepicker__day:hover {
    background-color: red;
    border-radius: 50%;
  }
`;
export default StyledDatePicker;
