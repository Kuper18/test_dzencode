import { AnimatePresence } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import PageTransition from '../transition';

const AnimatedLayout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Outlet />
      </PageTransition>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
