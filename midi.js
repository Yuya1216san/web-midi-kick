let midiAccess = null;
let output = null;

// MIDIノート番号：バスドラム（一般的には 36）
const KICK_NOTE = 36;

navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midi) {
  midiAccess = midi;
  const outputs = Array.from(midiAccess.outputs.values());
  output = outputs[0]; // 最初のデバイス（GarageBandへ送る想定）

  document.getElementById("drum").addEventListener("click", () => {
    if (output) {
      output.send([0x90, KICK_NOTE, 0x7f]); // Note ON
      output.send([0x80, KICK_NOTE, 0x00], window.performance.now() + 100); // Note OFF
    } else {
      alert("MIDI出力が見つかりませんでした");
    }
  });
}

function onMIDIFailure() {
  alert("MIDIの初期化に失敗しました");
}
