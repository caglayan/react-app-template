function logEvent(e) {
  console.log(e);
}

let audio = document.createElement("audio");

function dataAwEvent(e) {
  console.log(e);

  audio.controls = true;
  audio.src = URL.createObjectURL(e.data);

  var element = document.getElementById("root");
  element.appendChild(audio);
}

navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
  mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 128000,
    mimeType: "audio/wav"
  });
  console.log(mediaRecorder);
  mediaRecorder.addEventListener("start", logEvent);
  mediaRecorder.addEventListener("stop", logEvent);
  mediaRecorder.addEventListener("pause", logEvent);
  mediaRecorder.addEventListener("dataavailable", dataAwEvent);
  mediaRecorder.start(1000);
});

mediaRecorder.stop();
mediaRecorder.stream.getTracks()[0].stop();
