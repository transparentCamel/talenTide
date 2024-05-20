import React from 'react';
import FaqCard from '../../components/landing/FaqCard';

export default function Faq() {
  return (
    <section
      id='faq'
      className='py-16 px-8 2xl:py-32 2xl:px-64 xl:px-32 lg:px-16 flex flex-col items-center h-[1024px] xl:h-screen'
    >
      <h1 className='mb-4 text-center'>Frequently asked questions</h1>
      <h2 className='text-slate-400 text-2xl font-normal text-center'>
        Everything you need to know about Talentide.
      </h2>
      <div className='w-full flex flex-col gap-8 mt-32'>
        <FaqCard
          title={'How to create an account?'}
          text={
            'If there are no users in the database you have to create administrator account by pasting JSON provided in README.md into MongoDB collection "users", employee accounts can be created by administrator in their dashboard.'
          }
        />
        <FaqCard
          title={'How to launch application server?'}
          text={
            'You have to navigate via terminal to folder with server.js file and execute "node server.js" command.'
          }
        />
        <FaqCard
          title={'Why my profile image is not showing after upload?'}
          text={'As of now profile image loads only after user relog.'}
        />
      </div>
    </section>
  );
}
