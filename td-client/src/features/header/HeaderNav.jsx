import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function HeaderNav() {
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({
      behavior: 'smooth',
    });
    setIsHamburgerClicked(false);
  };

  const scrollToFaq = () => {
    const faqSection = document.getElementById('faq');
    faqSection.scrollIntoView({ behavior: 'smooth' });
    setIsHamburgerClicked(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsHamburgerActive(false);
      } else {
        setIsHamburgerActive(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isHamburgerActive) {
      setIsHamburgerClicked(false);
    }
  }, [isHamburgerActive]);

  return (
    <nav className='ml-auto h-full flex items-center sm:w-full '>
      {isHamburgerActive && (
        <FontAwesomeIcon
          icon={isHamburgerClicked ? faXmark : faBars}
          className='sm:hidden h-full w-6 cursor-pointer hover:text-blue duration-150'
          onClick={() => setIsHamburgerClicked(!isHamburgerClicked)}
        />
      )}
      <ul
        className={`absolute ${
          isHamburgerClicked ? 'flex' : 'hidden'
        } flex-col items-center bg-white max-sm:top-16 max-sm:right-0 max-sm:w-screen shadow-md sm:flex sm:flex-row sm:static sm:shadow-none sm:ml-auto sm:gap-8`}
      >
        <li
          className='max-sm:w-full text-center py-2 max-sm:hover:bg-blue max-sm:hover:text-white sm:hover:opacity-60 duration-150'
          onClick={scrollToAbout}
        >
          Learn more
        </li>
        <li
          className='max-sm:w-full text-center py-2 max-sm:hover:bg-blue max-sm:hover:text-white sm:hover:opacity-60 duration-150'
          onClick={scrollToFaq}
        >
          FAQ
        </li>
        <li className='max-sm:w-full text-center py-2 max-sm:hover:bg-blue max-sm:hover:text-white'>
          <a
            href='/login'
            className='block sm:hidden sm:hover:opacity-60 duration-150'
          >
            Log In
          </a>
          <a href='/login' className='hidden sm:block'>
            <Button text={'Log In'} />
          </a>
        </li>
      </ul>
    </nav>
  );
}
