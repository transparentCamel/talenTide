import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faCodeFork,
  faDatabase,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavItem from '../../components/dashboard/NavItem';
import { useRenderContext } from '../../customHooks/useRenderContext';
import { useTokenFetch } from '../../customHooks/useTokenFetch';
import axios from 'axios';

export default function Nav() {
  const { activeRender, handleRenderChange } = useRenderContext();
  const { user } = useTokenFetch();
  const [pendingTasks, setPendingTasks] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  const handleRenderChangeWithBurgerClose = (renderType) => {
    handleRenderChange(renderType);
    setIsHamburgerClicked(false);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');

        const userTasks = response.data.filter(
          (task) => task.assignedTo === user.userId && task.status === 'pending'
        );
        setPendingTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user.id]);

  const hasNewMessages = pendingTasks.length > 0;

  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
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
    <nav className='select-none w-1/4 border-e-2 h-screen border-gray-200 flex flex-col max-lg:flex-row max-lg:w-screen max-lg:h-16 max-lg:shadow-md relative'>
      <div className='flex flex-row items-center px-8 max-2xl:px-4 py-4 relative max-lg:w-full'>
        <h2>Talentide</h2>

        {isHamburgerActive && (
          <FontAwesomeIcon
            icon={isHamburgerClicked ? faXmark : faBars}
            className='cursor-pointer h-6 w-6 ml-auto lg:hidden hover:text-blue duration-150'
            onClick={() => {
              setIsHamburgerClicked(!isHamburgerClicked);
            }}
          />
        )}
      </div>
      <div className='w-full h-[2px] bg-gray-200 max-lg:hidden'></div>
      <ul
        className={`px-8 max-2xl:px-4 py-4 flex flex-col gap-4 max-lg:absolute max-lg:top-16 max-lg:bg-white max-lg:shadow-md max-lg:w-full max-lg:z-40 ${
          isHamburgerClicked ? 'flex' : 'max-lg:hidden'
        }`}
      >
        <p className='text-gray-400'>General</p>
        <li className='flex flex-col gap-4'>
          <NavItem
            icon={faCodeFork}
            text={'Workspace'}
            onClick={() => handleRenderChangeWithBurgerClose('workspace')}
            isActive={activeRender === 'workspace'}
          />
          {user.role === 'user' && (
            <NavItem
              icon={faEnvelopeOpen}
              text={'Inbox'}
              onClick={() => handleRenderChangeWithBurgerClose('inbox')}
              isActive={activeRender === 'inbox'}
              number={hasNewMessages ? pendingTasks.length : ''}
            />
          )}

          <NavItem
            icon={faChartLine}
            text={'Analytics'}
            onClick={() => handleRenderChangeWithBurgerClose('analytics')}
            isActive={activeRender === 'analytics'}
          />
          {user.role === 'admin' && (
            <NavItem
              icon={faDatabase}
              text={'Employee Database'}
              onClick={() => handleRenderChangeWithBurgerClose('db')}
              isActive={activeRender === 'db'}
            />
          )}
        </li>
        <p className='text-gray-400'>Quick links</p>
        <li className='flex flex-col gap-4'>
          <NavItem
            icon={faCircleQuestion}
            text={'Support'}
            onClick={() => handleRenderChangeWithBurgerClose('support')}
            isActive={activeRender === 'support'}
          />
          <NavItem
            icon={faCircleUser}
            text={'User Profile'}
            onClick={() => handleRenderChangeWithBurgerClose('profile')}
            isActive={activeRender === 'profile'}
          />
          <NavItem
            icon={faCircleXmark}
            text={'Log Out'}
            onClick={handleLogout}
          />
        </li>
      </ul>
    </nav>
  );
}
