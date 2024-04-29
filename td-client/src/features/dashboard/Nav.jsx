import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faCodeFork, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavItem from '../../components/dashboard/NavItem';
import { useRenderContext } from '../../customHooks/useRenderContext';
import { useTokenFetch } from '../../customHooks/useTokenFetch';

export default function Nav() {
  const [clickedProfile, setClickedProfile] = useState(false);
  const dropdownRef = useRef(null);
  const { activeRender, handleRenderChange } = useRenderContext();
  const { user } = useTokenFetch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClickedProfile(false);
      }
    };
    if (clickedProfile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clickedProfile]);

  return (
    <nav className='w-1/4 border-e-2 h-screen border-gray-200'>
      <div className='flex flex-row items-center px-8 py-4 relative'>
        <h2>Talentide</h2>
        <div
          ref={dropdownRef}
          className={`py-2 px-4 border-2 rounded-lg cursor-pointer  border-gray-200 text-blue ml-auto hover:bg-blue hover:text-white  duration-150 ${
            clickedProfile ? 'bg-blue border-blue' : ''
          }`}
          onClick={() => {
            setClickedProfile(!clickedProfile);
          }}
        >
          <FontAwesomeIcon
            icon={faCircleUser}
            className={`w-6 h-6 flex items-center ${
              clickedProfile ? 'text-white' : ''
            }`}
          />
        </div>
        {clickedProfile && (
          <div
            className='absolute right-8 top-20  bg-blue shadow-md rounded-lg select-none'
            ref={dropdownRef}
          >
            <ul className='flex flex-col  text-white'>
              <li
                className='hover:bg-sky-500 px-4 py-2 rounded-t-lg'
                onClick={() => handleRenderChange('profile')}
              >
                View Profile
              </li>
              <li
                className='hover:bg-sky-500 px-4 py-2 rounded-b-lg duration-150'
                onClick={handleLogout}
              >
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className='w-full h-[2px] bg-gray-200'></div>
      <ul className='px-8 py-4 flex flex-col gap-4'>
        <p className='text-gray-400'>General</p>
        <li className='flex flex-col gap-4'>
          <NavItem
            icon={faCodeFork}
            text={'Workspace'}
            onClick={() => handleRenderChange('workspace')}
            isActive={activeRender === 'workspace'}
          />
          <NavItem
            icon={faEnvelopeOpen}
            text={'Inbox'}
            onClick={() => handleRenderChange('inbox')}
            isActive={activeRender === 'inbox'}
          />
          <NavItem
            icon={faChartLine}
            text={'Analytics'}
            onClick={() => handleRenderChange('analytics')}
            isActive={activeRender === 'analytics'}
          />
          {user.role === 'admin' ? (
            <NavItem
              icon={faDatabase}
              text={'Employee Database'}
              onClick={() => handleRenderChange('db')}
              isActive={activeRender === 'db'}
            />
          ) : (
            <p>Loading</p>
          )}
        </li>
        <p className='text-gray-400'>Quick links</p>
        <li className='flex flex-col gap-4'>
          <NavItem
            icon={faCircleQuestion}
            text={'Support'}
            onClick={() => handleRenderChange('support')}
            isActive={activeRender === 'support'}
          />
          <NavItem
            icon={faCircleUser}
            text={'User Profile'}
            onClick={() => handleRenderChange('profile')}
            isActive={activeRender === 'profile'}
          />
        </li>
      </ul>
    </nav>
  );
}
