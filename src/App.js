import React from "react";
import { isMobile } from "react-device-detect";

const MobileDevice = () => {
  // const [isOpen, setIsOpen] = useState(false);

  const onHandlerOpenCamera = () => {
    let video = document.getElementById("vid");
    video.style.width = document.width + "px";
    video.style.height = document.height + "px";
    video.setAttribute("autoPlay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Некоторые браузеры частично реализуют свойство mediaDevices, поэтому
    //мы не можем присвоить ссылку на объект свойству getUserMedia, поскольку
    //это переопределит существующие свойства. Здесь, просто добавим свойство
    //getUserMedia , если оно отсутствует.

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        // Сначала, если доступно, получим устаревшее getUserMedia

        var getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        //Некоторые браузеры не реализуют его, тогда вернём отменённый промис
        // с ошибкой для поддержания последовательности интерфейса

        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }

        // Иначе, обернём промисом устаревший navigator.getUserMedia

        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { facingMode: { exact: "environment" } },
      })
      .then(function(stream) {
        var video = document.querySelector("video");
        // Устаревшие браузеры могут не иметь свойство srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          // Не используем в новых браузерах
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    // setIsOpen(true);
    // var but = document.getElementById("but");
    //   var video = document.getElementById("vid");
    //   var mediaDevices = navigator.mediaDevices;
    //   // vid.muted = true;
    //   // Accessing the user camera and video.
    //   mediaDevices
    //     .getUserMedia({
    //       audio: false,
    //       video: {
    //         sourceId: "default",
    //         facingMode: { exact: "user" },
    //       },
    //     })
    //     .then((stream) => {
    //       // Changing the source of video to current stream.
    //       video.srcObject = stream;
    //       video.addEventListener("loadedmetadata", () => {
    //         video.play();
    //       });
    //     })
    //     .catch(alert);
  };

  const onHandlerGoToAppStore = () => {
    window.location.href =
      "https://apps.apple.com/ru/app/%D0%BE%D0%B3%D0%BE%D0%BD%D1%8C/id1577796889";
  };

  return (
    <>
      {isMobile ? (
        <span>
          Вы зашли с мобильного устройства. Так что можете открыть камеру
        </span>
      ) : (
        <span>Открытие камеры работает только на мобильном девайсе</span>
      )}
      {isMobile && (
        <center>
          <div>
            <video autoPlay id="vid"></video>
          </div>
          <br />
          <button onClick={() => onHandlerOpenCamera()} id="but" autoPlay>
            Open WebCam
          </button>
          <button onClick={() => onHandlerGoToAppStore()}>
            GO TO APP STORE
          </button>
        </center>
      )}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <MobileDevice />
    </div>
  );
}

export default App;
