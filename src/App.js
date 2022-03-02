import React, { useState } from 'react';

import { PatternView } from './components/PatternView';

export const App = () => {
  const [time, setTime] = useState(true);
  return (
    <>
      <PatternView maxTime={time ? 4000 : 2000} />
      <input type="checkbox" checked={time} onChange={(e) => setTime(e.target.checked)}></input>
    </>
  );
}
