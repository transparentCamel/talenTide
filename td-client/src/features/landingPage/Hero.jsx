import React from 'react';
import tide from '../../assets/video/tide.mp4';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className='flex h-[1024px] xl:h-screen'>
      <div className='w-full relative h-full'>
        <div className='absolute z-20 h-full py-16 px-8 2xl:py-32 2xl:px-64 xl:px-32 lg:px-16'>
          <div className='flex flex-col 2xl:w-2/3 py-6 lg:py-12 px-8 lg:px-16 2xl:pr-32 bg-white text-black shadow-md rounded-xl'>
            <h1 className='mb-8'>Welcome to Talentide</h1>
            <h2 className='mb-4'>
              Where talent meets the tide of productivity.
            </h2>
            <p className='2xl:text-xl mb-4'>
              Unlock the potential of your team, streamline your HR processes,
              and sail towards success with confidence. Join the wave of modern
              businesses optimizing their workforce management with Talentide.
            </p>
            <Link
              to='/login'
              className='text-pink mb-4 hover:opacity-80 self-start duration-150 select-none'
            >
              Already ride the same tide? Log In
            </Link>

            <Button text={'Join us'} className={'self-start mt-auto'} />
          </div>
        </div>

        <div className='absolute bg-black h-full w-full z-10 opacity-30'></div>
        <video
          src={tide}
          alt='Waves'
          loop
          muted
          autoPlay
          className='absolute  object-cover h-full w-full'
        />
      </div>
    </section>
  );
}
