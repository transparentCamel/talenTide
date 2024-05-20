import {
  faLinkedin,
  faSquareFacebook,
  faSquareXTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function Footer() {
  return (
    <footer className='bg-black text-white h-64 flex flex-col items-center py-8 px-16 select-none'>
      <h3 className='mb-2'>Talentide</h3>
      <div className='flex gap-2'>
        <FontAwesomeIcon
          icon={faSquareFacebook}
          className='h-6 cursor-pointer hover:opacity-60 duration-150'
        />
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          className='h-6 cursor-pointer hover:opacity-60 duration-150'
        />
        <FontAwesomeIcon
          icon={faLinkedin}
          className='h-6 cursor-pointer hover:opacity-60 duration-150'
        />
        <FontAwesomeIcon
          icon={faYoutube}
          className='h-6 cursor-pointer hover:opacity-60 duration-150'
        />
      </div>
      <a
        className='mt-auto flex items-center gap-1 hover:opacity-60 cursor-pointer duration-150'
        href='https://github.com/transparentCamel'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FontAwesomeIcon icon={faCopyright} className='h-3' />
        <p>Arvydas Pečiulis</p>
      </a>
    </footer>
  );
}
