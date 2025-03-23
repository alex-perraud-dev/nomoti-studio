import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr'; // Importe la locale française
import { gsap } from 'gsap';

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

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${(props) => props.theme.body} inset !important;
    -webkit-text-fill-color: ${(props) => props.theme.text} !important;
  }
`;

const Select = styled.select`
  width: 100%;
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
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.grey};
    transform: scale(1.05); /* Légère augmentation de la taille au survol */
  }

  &:active {
    transform: scale(0.95); /* Réduction de la taille au clic */
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + label {
    background-color: ${(props) => props.theme.text};
  }

  &:checked + label:before {
    transform: translateX(10px);
  }
`;

const SwitchLabel = styled.label`
  margin-top: 3px;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 20px;
  background-color: ${(props) => props.theme.grey};
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:before {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: 4px;
    bottom: 4px;
    background-color: ${(props) => props.theme.body};
    border-radius: 50%;
    transition: transform 0.3s;
  }
`;

const Label = styled.label`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const DatePickerContainer = styled.div`
  width: 100%;
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

  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Animation d'apparition avec GSAP
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('laa');
            setIsVisible(true);
            gsap.from('.form-field', {
              opacity: 0,
              y: 20,
              stagger: 0.1,
              duration: 0.5,
              delay: 0.4,
            });
            observer.unobserve(entry.target); // Arrêter d'observer après l'animation
          }
        });
      },
      {
        rootMargin: '0px 0px -400px 0px', // Déclenche l'animation lorsque l'élément est visible à 400px du bas
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  return (
    <FormContainer ref={formRef}>
      <Form
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Contactez-nous</Title>
        <Input
          className="form-field"
          type="text"
          name="firstName"
          placeholder="Votre prénom"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          className="form-field"
          type="text"
          name="lastName"
          placeholder="Votre nom"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <Select
          className="form-field"
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
          <DatePicker
            className="form-field"
            selected={formData.date}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Choisissez une date et une heure"
            locale={fr} // définit la langue en français
            required
          />
        </DatePickerContainer>
        <TextArea
          className="form-field"
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
            id="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <SwitchLabel htmlFor="consent" />
          <Label>J'accepte d'être recontacté</Label>
        </CheckboxContainer>
        <Button type="submit">Envoyer le message</Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
