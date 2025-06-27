import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { dark } from './styles/Themes';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import HomePage from './pages/Home';
import { AnimatePresence } from 'framer-motion';
import ScrollTriggerProxy from './components/ScrollTriggerProxy';
import Footer from './sections/Footer';
import Loader from './components/Loader';
import DatePickerGlobalStyles from './components/StyledDatePicker';
import { Route, Routes } from 'react-router-dom';
import MasteringPage from './pages/Mastering';
import StudioSessionPage from './pages/StudioSession';
import MaoPage from './pages/Mao';
import ContactPage from './pages/Contact';

function App() {
  const containerRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);
  if (typeof window !== 'undefined' && window.history.scrollRestoration) {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <GlobalStyles />

      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <AnimatePresence>{loaded ? null : <Loader />}</AnimatePresence>
          <ScrollTriggerProxy />
          <AnimatePresence>
            <main className="App" data-scroll-container ref={containerRef}>
              <DatePickerGlobalStyles />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/session-studio" element={<StudioSessionPage />} />
                <Route path="/mastering-mix" element={<MasteringPage />} />
                <Route path="/cours-de-mao" element={<MaoPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
              <Footer />
            </main>
          </AnimatePresence>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
