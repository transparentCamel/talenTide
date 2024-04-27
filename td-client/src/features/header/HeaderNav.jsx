import React from 'react';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function HeaderNav() {
  return (
    <nav className='ml-auto'>
      <ul className='flex items-center gap-8'>
        <li className='hover:opacity-60 duration-150'>Learn more</li>
        <li className='hover:opacity-60 duration-150'>Support</li>
        <li>
          <Link to='/login'>
            <Button text={'Log In'} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
