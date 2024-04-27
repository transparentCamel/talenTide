import React from 'react';
import tide from '../../assets/video/tide.mp4';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className='flex '>
      <div className='w-full relative h-[768px]'>
        <div className='absolute z-20  px-64 py-32'>
          <div className='flex flex-col w-1/2 p-12 gap-4 bg-white text-black shadow-md rounded-xl'>
            <h1 className=''>Welcome to Talentide</h1>
            <h2 className=''>Where talent meets the tide of productivity.</h2>
            <p className=''>
              Unlock the potential of your team, streamline your HR processes,
              and sail towards success with confidence. Join the wave of modern
              businesses optimizing their workforce management with Talentide.
            </p>
            <Link
              to='/login'
              className='text-red hover:opacity-80 self-start duration-150'
            >
              Already ride the same tide? Log In
            </Link>

            <Button text={'Join us'} className={'self-start'} />
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
