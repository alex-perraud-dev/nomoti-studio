import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const FaqContainer = styled(motion.div)`
  max-width: 600px;
  margin: 2rem auto 4rem auto;
  background: #21222c;
  color: #fff;
  border-radius: 22px;
  box-shadow: 0 6px 26px rgba(4, 0, 0, 0.15);
  padding: 2.5rem 2rem 2.1rem 2rem;
`;

const FaqTitle = styled(motion.h2)`
  font-size: 2.1rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 0.06em;
`;

const QuestionBox = styled(motion.div)`
  background: #292a39;
  margin: 1.2rem 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
`;

const QuestionRow = styled(motion.div)`
  cursor: pointer;
  font-weight: 500;
  font-size: 1.14rem;
  padding: 1.15rem 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #292a39;
  outline: none;
`;

const Answer = styled(motion.div)`
  font-size: 1rem;
  color: #e4e5ff;
  background: #23232e;
  padding: 1.12rem 1.4rem;
  line-height: 1.7;
  border-top: 1px solid #38395a;
`;

const Arrow = styled(motion.span)`
  margin-left: 1rem;
  display: inline-block;
  font-size: 1.3rem;
  user-select: none;
`;

const faqData = [
  {
    q: 'Quel type de services fournissez-vous ?',
    a: "Nous proposons du conseil créatif, du design, des sessions studio et une variété de prestations liées à la mode et à l'image de marque.",
  },
  {
    q: 'Où êtes-vous situés ?',
    a: 'Notre studio est basé en Californie, mais nous travaillons avec des clients du monde entier.',
  },
  {
    q: 'Comment réserver une prestation ?',
    a: 'Contactez-nous via le formulaire en ligne, choisissez une date souhaitée, nous vous répondrons rapidement avec les disponibilités.',
  },
  {
    q: 'Vos créations sont-elles uniques ?',
    a: 'Oui, chaque pièce et chaque prestation est conçue de manière unique selon les besoins de nos clients.',
  },
];

// Animation Framer pour la réponse
const answerMotion = {
  initial: { opacity: 0, height: 0, scaleY: 0.97 },
  animate: {
    opacity: 1,
    height: 'auto',
    scaleY: 1,
    transition: { duration: 0.3, ease: [0.26, 1, 0.48, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    scaleY: 0.97,
    transition: { duration: 0.22, ease: [0.45, 0, 0.55, 1] },
  },
};

export default function AnimatedFAQ() {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  // Apparition Gsap seulement à l’entrée dans la fenêtre
  useEffect(() => {
    const checkInView = () => {
      if (!ref.current || hasAnimated) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setHasAnimated(true);
      }
    };
    checkInView();
    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    return () => {
      window.removeEventListener('scroll', checkInView);
      window.removeEventListener('resize', checkInView);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated && ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 80, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'power3.out' }
      );
    }
  }, [hasAnimated]);

  return (
    <FaqContainer
      ref={ref}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'none' : 'translateY(80px) scale(0.96)',
      }}
    >
      <FaqTitle
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.55 }}
      >
        Foire Aux Questions
      </FaqTitle>
      {faqData.map((item, idx) => (
        <QuestionBox
          key={idx}
          whileHover={{ scale: 1.01, background: '#31314a' }}
          transition={{ type: 'spring', stiffness: 140, damping: 10 }}
        >
          <QuestionRow
            initial={false}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            tabIndex={0}
            whileTap={{ scale: 0.98, background: '#29293c' }}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-answer-${idx}`}
          >
            {item.q}
            <Arrow
              initial={false}
              animate={{ rotate: openIndex === idx ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            >
              ▶
            </Arrow>
          </QuestionRow>
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <Answer key="answer" id={`faq-answer-${idx}`} {...answerMotion}>
                {item.a}
              </Answer>
            )}
          </AnimatePresence>
        </QuestionBox>
      ))}
    </FaqContainer>
  );
}
