
let audioContext: AudioContext | null = null;

// Inicializa o áudio somente no navegador
const getAudioContext = () => {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
};

// Desbloqueia o áudio após uma interação do usuário
const unlockAudio = async () => {
  const context = getAudioContext();

  if (context?.state === "suspended") {
    await context.resume();
  }
};

// Cria um som usando oscilador
const playTone = (
  startFrequency: number,
  endFrequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine"
) => {
  const context = getAudioContext();

  if (!context || context.state !== "running") return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  const now = context.currentTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(
    Math.max(endFrequency, 1),
    now + duration
  );

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
};

// Cria ruído para simular mordidas e impactos
const playNoise = (
  duration: number,
  volume: number,
  filterFrequency: number,
  filterType: BiquadFilterType = "lowpass"
) => {
  const context = getAudioContext();

  if (!context || context.state !== "running") return;

  const bufferSize = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(
    1,
    bufferSize,
    context.sampleRate
  );

  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  const now = context.currentTime;

  source.buffer = buffer;

  filter.type = filterType;
  filter.frequency.value = filterFrequency;

  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  source.start(now);
  source.stop(now + duration);
};

// Mordida na maçã
const playBite = () => {
  playNoise(0.12, 0.35, 2200, "lowpass");
  playTone(180, 90, 0.09, 0.18, "triangle");
};

// Mudança de direção
const playTurn = () => {
  playTone(650, 420, 0.07, 0.15, "sine");
};

// Colisão / Game Over
const playGameOver = () => {
  playNoise(0.28, 0.45, 450, "lowpass");
  playTone(150, 45, 0.32, 0.40, "triangle");
};

export const useGameSounds = () => {
  return {
    unlockAudio,
    playBite,
    playTurn,
    playGameOver,
  };
};
