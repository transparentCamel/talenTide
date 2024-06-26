import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import {
  faImage,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteAuth from './DeleteAuth';
import Heading from '../../components/dashboard/Heading';
import SearchInput from '../../components/dashboard/SearchInput';

export default function EmpDb({}) {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [users]);

  const userCount = users.length;

  const handleAddUserClick = () => {
    setIsFormOpen(true);
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        setUsers(users.filter((user) => user._id !== userId));
        setIsDeleteOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.team.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <section className='border-2 rounded-lg p-4 mt-[18px] mx-4 '>
      <Heading heading={'Employee database'} />
      <div className='w-full flex items-center py-4 max-md:flex-col max-md:items-start gap-4'>
        <div className='flex items-center'>
          <h3 className='mr-4 text-nowrap'>Team members</h3>
          <div className='flex flex-row  gap-1 bg-slate-100 px-4 py-2 rounded-full'>
            {filteredUsers ? <p>{filteredUsers.length}</p> : <p>{userCount}</p>}
            <p>
              {userCount === 1 || filteredUsers.length === 1 ? 'user' : 'users'}
            </p>
          </div>
        </div>
        <div className='flex w-full max-sm:flex-col gap-4'>
          <SearchInput
            placeholder='Search employees'
            onChange={handleSearchInputChange}
            state={searchInput}
            setState={() => setSearchInput('')}
            divClass={'max-sm:w-full'}
            inputClass={'max-sm:w-full'}
          />
          <button
            className='px-4 py-2 bg-black text-white rounded-lg ml-auto hover:bg-blue duration-150 max-sm:ml-0'
            onClick={handleAddUserClick}
          >
            + Add user
          </button>
        </div>
      </div>
      <div className='overflow-x-auto  border-2 rounded-xl'>
        <table className='w-full  shadow-md'>
          <thead>
            <tr>
              <th className='w-1/5 p-4 text-left'>Name</th>
              <th className='w-1/5 p-4 text-left'>Team</th>
              <th className='w-1/5 p-4 text-left'>Email</th>
              <th className='w-1/5 p-4 text-left'>Phone</th>
              <th className='w-1/5 p-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? 'bg-gray-100' : ''}
              >
                <td className='p-4 flex flex-row items-center'>
                  {user.profileImage ? (
                    <img
                      src={`http://localhost:3001/images/${user.profileImage}`}
                      alt='Profile'
                      className='w-16 h-16 rounded-full overflow-hidden object-cover'
                    />
                  ) : (
                    <span className='flex rounded-full w-16 h-16 items-center justify-center text-slate-500'>
                      <FontAwesomeIcon icon={faImage} className='w-6 h-6' />
                    </span>
                  )}

                  {user.name}
                </td>
                <td className='p-4'>{user.team}</td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>{user.phone}</td>
                <td className='p-4 flex gap-4'>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className='w-6 h-6 cursor-pointer text-slate-600 hover:text-blue duration-150'
                    onClick={() => handleEditUserClick(user)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className='w-6 h-6 cursor-pointer text-slate-600 hover:text-red duration-150'
                    onClick={() => handleDeleteUserClick(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <UserForm
          title={'Add new employee'}
          btnText={'Add'}
          onClose={() => setIsFormOpen(false)}
        />
      )}
      {isEditOpen && (
        <UserForm
          title={'Edit employee'}
          btnText={'Save'}
          onClose={() => setIsEditOpen(false)}
          user={selectedUser}
        />
      )}
      {isDeleteOpen && (
        <DeleteAuth
          onClose={() => {
            setIsDeleteOpen(false);
          }}
          id={selectedUser._id}
          name={selectedUser.name}
          surname={selectedUser.surname}
          email={selectedUser.email}
          deleteClick={() => handleDeleteUser(selectedUser._id)}
        />
      )}
    </section>
  );
}
