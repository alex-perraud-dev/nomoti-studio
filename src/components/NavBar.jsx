import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CatSvg from '../assets/Svgs/cat.svg';
import { Link } from 'react-router-dom'; // Importation de Link

const NavContainer = styled(motion.div)`
  width: 100vw;
  z-index: 6;
  position: absolute;
  top: ${(props) => (props.click ? '0' : `-${props.theme.navHeight}`)};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @media (min-width: 64em) {
    position: fixed;
    top: 0;
    transition: none;
  }

  @media (max-width: 40em) {
    top: ${(props) => (props.click ? '0' : `calc(-50vh - 4rem)`)};
  }
`;

const MenuItems = styled(motion.ul)`
  position: relative;
  height: ${(props) => props.theme.navHeight};
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10rem;

  @media (max-width: 40em) {
    flex-direction: column;
    padding: 2rem 0;
    height: 50vh;
  }
  @media (min-width: 64em) {
    background-color: transparent;
  }
`;

const MenuBtn = styled.li`
  background-color: ${(props) => `rgba(${props.theme.textRgba}, 0.7)`};
  list-style-type: none;
  color: ${(props) => props.theme.body};
  width: 15rem;
  height: 2.5rem;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontmd};
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 40em) {
    width: 10rem;
    height: 2rem;
  }
  @media (min-width: 64em) {
    display: none;
  }
`;

const CatIcon = styled.img`
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  width: 1.2rem;
  height: auto;
`;

const MenuItem = styled(motion.li)`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  position: relative;

  /* Apply to Link when MenuItem is used with 'as={Link}' */
  a {
    color: inherit;
    text-decoration: none;
    display: flex; /* Ensures CatIcon aligns well if Link wraps content */
    align-items: center; /* Aligns text and potential icon */
  }

  &:hover ul {
    /* handled with AnimatePresence + framer-motion */
  }
  &:hover ${CatIcon} {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  @media (max-width: 40em) {
    flex-direction: column;
    padding: 0.5rem 0;
  }
`;

const SubMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SubMenu = styled(motion.ul)`
  position: absolute;
  top: 100%;
  min-width: 160px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.01);
  list-style: none;
  padding: 0.5rem 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  li {
    padding: 0.5rem 0;
    cursor: pointer;
    color: ${(props) => props.theme.text};
    text-align: center;
    position: relative;
    background: none;
    transition:
      background 0.2s,
      color 0.2s;
  }

  li a {
    /* Style for Links within submenu items */
    color: inherit;
    text-decoration: none;
    display: block; /* Make the link fill the li */
  }

  li:hover,
  li:focus {
    color: #d1c2c2;
  }

  li::after {
    content: '';
    display: block;
    margin: 0 auto;
    margin-top: 6px;
    width: 0;
    border-bottom: 2px solid ${(props) => props.theme.text};
    transition: width 0.2s;
  }

  li:hover::after,
  li:focus::after {
    width: 60%;
  }
`;

const ChevronContainer = styled.div`
  display: inline-flex;
  margin-left: 0.5rem;
`;

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    let elem = document.querySelector(id);
    setClick(false); // ferme le menu mobile
    // Vérifiez si scroll et elem existent avant d'appeler scrollTo
    if (scroll && elem) {
      scroll.scrollTo(elem, {
        offset: '-100',
        duration: '2000',
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    } else if (elem) {
      // Fallback si scroll n'est pas disponible (par ex. hors contexte LocomotiveScrollProvider)
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = () => {
    setClick(false);
  };

  const handleSubMenuLinkClick = () => {
    setClick(false);
    setSubmenuOpen(false);
  };

  return (
    <NavContainer
      click={+click}
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <MenuItems
        drag="y"
        dragConstraints={{ top: 0, bottom: 70 }}
        dragElastic={0.05}
        dragSnapToOrigin
      >
        <MenuBtn onClick={() => setClick(!click)}>Menu</MenuBtn>
        <MenuItem
          as={Link}
          to="/"
          onClick={handleLinkClick}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
        >
          Accueil
          <CatIcon src={CatSvg} alt="Cat Icon" className="cat-icon" />
        </MenuItem>
        <MenuItem
          onClick={() => handleScroll('.about')} // Garde le défilement pour "à propos"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
        >
          à propos
          <CatIcon src={CatSvg} alt="Cat Icon" className="cat-icon" />
        </MenuItem>
        <SubMenuContainer
          onMouseEnter={() => setSubmenuOpen(true)}
          onMouseLeave={() => setSubmenuOpen(false)}
        >
          <MenuItem
            as={motion.div} // Reste un div car il ouvre le sous-menu
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            Prestations
            <ChevronContainer>
              {submenuOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </ChevronContainer>
          </MenuItem>
          <AnimatePresence>
            {submenuOpen && (
              <SubMenu
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
                onMouseEnter={() => setSubmenuOpen(true)} // Garde le sous-menu ouvert
                onMouseLeave={() => setSubmenuOpen(false)} // Permet de fermer en quittant le sous-menu
              >
                <li onClick={handleSubMenuLinkClick}>
                  <Link to="/cours-de-mao">MAO</Link>
                </li>
                <li onClick={handleSubMenuLinkClick}>
                  <Link to="/mastering-mix">Mastering</Link>
                </li>
                <li onClick={handleSubMenuLinkClick}>
                  <Link to="/session-studio">Session Studio</Link>
                </li>
              </SubMenu>
            )}
          </AnimatePresence>
        </SubMenuContainer>
        <MenuItem
          as={Link}
          to="/contact"
          onClick={handleLinkClick}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9, y: 0 }}
        >
          Contact
          <CatIcon src={CatSvg} alt="Cat Icon" className="cat-icon" />
        </MenuItem>
      </MenuItems>
    </NavContainer>
  );
};

export default NavBar;
