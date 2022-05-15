import { useState, useEffect } from 'react';

export default function Courses({ courses, title }) {
  return (
    <div className='courses'>
      <p className='courses__title'>
        {title}
      </p>
    </div>
  );
}