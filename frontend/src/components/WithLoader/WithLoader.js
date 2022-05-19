import Loader from '../Loader/Loader.js';
import { useState } from 'react';

export default function WithLoader({ children }) {

  const [isLoading, setIsLoading] = useState(true);
  children.props.setIsLoading = setIsLoading;
  return (
    <>
      {isLoading
        ? <>
            <Loader></Loader>
            <div style={{display: 'none'}}>
              {children}
            </div>
          </>
        : children
      }
    </>
  )
}