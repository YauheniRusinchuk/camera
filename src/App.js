import React from "react";

const MobileDevice = () => {
  // const [isOpen, setIsOpen] = useState(false);

  const onHandlerOpenCamera = () => {
    // setIsOpen(true);
    // var but = document.getElementById("but");
    var video = document.getElementById("vid");
    var mediaDevices = navigator.mediaDevices;
    // vid.muted = true;
    // Accessing the user camera and video.
    mediaDevices
      .getUserMedia({
        audio: false,
        video: { facingMode: { exact: "environment" } },
      })
      .then((stream) => {
        // Changing the source of video to current stream.
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      })
      .catch(alert);
  };

  return (
    <>
      <h1>Вы зашли с мобильного устройства. Так что можете открыть камеру</h1>
      <center>
        <div>
          <video width="200px" height="200px" autoPlay id="vid"></video>
        </div>
        <br />
        <button onClick={() => onHandlerOpenCamera()} id="but" autoPlay>
          Open WebCam
        </button>
      </center>
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
