import React from 'react';

function Boxes({ text, count }) {
  return (
    <div className='border w-full sm:w-64 rounded-lg bg-blue-500 ' >
      <div className='border ml-2 bg-white '>
        <div className='flex flex-col pb-5 pt-3 pl-3'>
          <label className='text-l' htmlFor="">{text}</label>
          <span className='text-3xl' >{count}</span>
        </div>
      </div>
    </div>
  );
}

export default Boxes;
