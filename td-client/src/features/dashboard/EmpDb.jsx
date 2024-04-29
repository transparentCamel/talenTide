import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import {
  faPenToSquare,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteAuth from './DeleteAuth';

export default function EmpDb({}) {
  const [users, setUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/auth/users')
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
      .delete(`http://localhost:3001/api/auth/users/${userId}`)
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
      user.team.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <section className='m-4 p-4 border-2 rounded-xl'>
      <h2 className='mb-8'>Employee Database</h2>
      <table className='w-full flex flex-col border-2 rounded-lg'>
        <div className='w-full flex items-center border-b-2 p-4'>
          <h3 className='mr-4'>Team members</h3>
          <div className='flex flex-row  gap-1 bg-slate-100 px-4 py-2 rounded-full'>
            <p>{userCount}</p>
            <p> {userCount > 1 ? 'users' : 'user'}</p>
          </div>
          <div className='relative ml-8'>
            <input
              type='text'
              className='pr-12'
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder='Search employees'
            />
            {searchInput && (
              <FontAwesomeIcon
                icon={faXmark}
                className='absolute p-2 top-1 mt-0.5 right-2 cursor-pointer hover:text-blue duration-150'
                onClick={() => {
                  setSearchInput('');
                }}
              />
            )}
          </div>

          <button
            className='px-4 py-2 bg-black text-white rounded-lg ml-auto hover:bg-blue duration-150'
            onClick={handleAddUserClick}
          >
            + Add user
          </button>
        </div>

        <thead className='p-4'>
          <tr className='flex'>
            <th className='w-1/3 text-start'>Name</th>
            <th className='w-1/3 text-start'>Email</th>
            <th className='w-1/3 text-start'>Team</th>
            <th className='text-start mr-1'>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {filteredUsers.map((user, index) => (
            <tr
              key={user._id}
              className={`p-4 flex items-center ${
                index % 2 !== 1 ? 'bg-slate-100' : ''
              }`}
            >
              <td className='flex items-center gap-2 w-1/3 text-start'>
                <div className='bg-blue rounded-full w-16 h-16'></div>
                {user.name}
              </td>
              <td className='w-1/3 text-start'>{user.email}</td>
              <td className='w-1/3 text-start'>{user.team}</td>
              <div className='ml-auto flex gap-4'>
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
              </div>
            </tr>
          ))}
        </tbody>
      </table>
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
