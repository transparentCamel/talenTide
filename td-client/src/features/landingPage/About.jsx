import React from 'react';
import officeImg from '../../assets/images/office.jpg';
import AboutCard from '../../components/landing/AboutCard';

export default function About() {
  return (
    <section
      id='about'
      className='py-16 px-8 2xl:py-32 2xl:px-64 xl:px-32 lg:px-16  flex flex-col items-center h-[1536px] xl:h-screen'
    >
      <p className='text-blue text-center'>About Us</p>
      <h1 className='my-8 text-center'>Lorem ipsum dolor</h1>
      <p className='text-center lg:w-1/2 text-lg'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
        odio! Natus non aliquid autem ducimus nam culpa voluptatum vero ut
        excepturi molestiae veritatis laboriosam voluptatibus eius aut dicta,
        quis accusantium?
      </p>
      <div className='mt-16 2xl:mt-32 w-full flex-grow rounded-2xl overflow-hidden shadow-xl relative'>
        <div className='absolute w-full h-full flex flex-col lg:flex-row items-center px-8 py-4 lg:gap-8 gap-4 justify-center'>
          <AboutCard
            heading={'500+'}
            textShort={'Lorem ipsum dolor sit'}
            textLong={
              'Natus non aliquid autem ducimus nam culpa voluptatum vero utexcepturi'
            }
          />
          <AboutCard
            heading={'100%'}
            textShort={'Lorem ipsum dolor sit'}
            textLong={
              'Natus non aliquid autem ducimus nam culpa voluptatum vero utexcepturi'
            }
          />
          <AboutCard
            heading={'10k'}
            textShort={'Lorem ipsum dolor sit'}
            textLong={
              'Natus non aliquid autem ducimus nam culpa voluptatum vero utexcepturi'
            }
          />
        </div>
        <img
          src={officeImg}
          alt='office'
          className='object-cover h-full w-full'
        />
      </div>
    </section>
  );
}
