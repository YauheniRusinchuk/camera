import React from "react";
import { isMobile } from "react-device-detect";

const MobileDevice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onHandlerOpenCamera = () => {
    setIsOpen(true);
    if (navigator.webkitGetUserMedia != null) {
      var options = {
        video: true,
        audio: true,
      };

      // запрашиваем доступ к веб-камере
      navigator.webkitGetUserMedia(
        options,
        function(stream) {
          // получаем тег video
          var video = document.querySelector("video");
          // включаем поток в магический URL
          video.src = window.webkitURL.createObjectURL(stream);
        },
        function(e) {
          console.log("error happened");
        }
      );
    }
  };

  return (
    <>
      <h1>Вы зашли с мобильного устройства. Так что можете открыть камеру</h1>
      <button onClick={() => onHandlerOpenCamera()}>Открыть камеру</button>
      {isOpen && <video width="300px" height="320px" autoplay></video>}
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
