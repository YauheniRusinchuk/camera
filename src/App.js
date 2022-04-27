import React from "react";
import { isMobile } from "react-device-detect";

const MobileDevice = () => {
  return (
    <>
      <h1>Вы зашли с мобильного устройства. Так что можете открыть камеру</h1>
      <button>Открыть камеру</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      {isMobile ? (
        <MobileDevice />
      ) : (
        <span>Открытие камеры работает из мобильного девайса</span>
      )}
    </div>
  );
}

export default App;
