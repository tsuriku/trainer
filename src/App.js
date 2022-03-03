import React, { useState } from 'react';

import { PatternView } from './components/PatternView';

export const App = () => {
  const [hardMode, setIsHardMode] = useState(false); // OwO
  const [textLength, setTextLength] = useState(6);

  return (
    <>
      <PatternView
        maxTime={hardMode ? 2000 : 4000}
        textLength={textLength}
      />

  <span class="hc">Hardcore mód</span>
  <input class="hcmode"
        type="checkbox"
        checked={hardMode}
        onChange={(e) => setIsHardMode(e.target.checked)}
      ></input>
      <select class="diffi"
        name="difficulty"
        value={textLength.toString()}
        onChange={(e) => setTextLength(parseInt(e.target.value))}
      >
        <option value="6">Normál</option>
        <option value="7">Haladó</option>
        <option value="8">Nehéz</option>
        <option value="10">Extrém</option>
      </select>
    </>
  );
}
