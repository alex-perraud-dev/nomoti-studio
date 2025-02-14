import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import StyledDatePicker from './StyledDatePicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importer le style de react-datepicker

const FormContainer = styled.section`
  min-height: 100vh;
  width: 80vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 48em) {
    width: 90vw;
  }
`;

const Form = styled(motion.form)`
  background-color: ${(props) => props.theme.body};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;

  @media (max-width: 30em) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontxxl};
  font-family: 'Kaushan Script';
  color: ${(props) => props.theme.text};
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 94%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.text};
  }
`;

const Select = styled.select`
  width: 94%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.text};
  }
`;

const TextArea = styled.textarea`
  width: 94%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  resize: none;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.text};
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontlg};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.grey};
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const DatePickerContainer = styled.div`
  width: 94%;
  margin: 0.5rem 0;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    service: '',
    date: new Date(),
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <FormContainer>
      <Form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Contactez-nous</Title>
        <Input
          type="text"
          name="firstName"
          placeholder="Votre prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Votre nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez un service
          </option>
          <option value="Session d'enregistrement 2H">
            Session d'enregistrement 2H
          </option>
          <option value="Session d'enregistrement 4H">
            Session d'enregistrement 4H
          </option>
          <option value="Session d'enregistrement 8H">
            Session d'enregistrement 8H
          </option>
          <option value="Mixage">Mixage</option>
          <option value="Mastering">Mastering</option>
          <option value="Cours de MAO">Cours de MAO</option>
        </Select>
        <DatePickerContainer>
          <StyledDatePicker
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Choisissez une date et une heure"
            required
          />
        </DatePickerContainer>
        <TextArea
          name="message"
          placeholder="Votre message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <label>J'accepte d'être recontacté</label>
        </CheckboxContainer>
        <Button type="submit">Envoyer le message</Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
