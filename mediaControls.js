document.addEventListener('DOMContentLoaded', () => {
  const playBtn    = document.querySelector('.play');
  const pauseBtn   = document.querySelector('.pause');
  const rewindBtn  = document.querySelector('.ContainerBox:first-child');
  const fastFwdBtn = document.querySelector('.fast-forward');

  const civCar     = document.querySelector('.CsedanContainer');
  const policeCar  = document.querySelector('.PsedanContainer');

  if (!civCar || !policeCar) {
    console.error('Convoy vehicles not found in the DOM.');
    return;
  }

  // ── Constants ──────────────────────────────────────────
  const CAR_WIDTH   = 150;  // visual width after CSS scale(0.5) on 300px element
  const GAP         = 220;  // spacing between the two cars
  const BASE_SPEED  = 3;
  const FAST_SPEED  = 7;
  const REW_SPEED   = 6;

  // ── State ──────────────────────────────────────────────
  let civX      = -CAR_WIDTH;
  let policeX   = civX - GAP;
  let speed     = BASE_SPEED;
  let direction = 1;          // 1 = right, -1 = left
  let isPlaying = false;
  let rafId     = null;

  // active-toggle states for rewind / fast-forward buttons
  let ffActive  = false;
  let rewActive = false;

  // ── DOM helpers ────────────────────────────────────────
  function setX(el, x)    { el.style.left = x + 'px'; }
  function setFace(el, d) {
    el.style.transform = d === 1 ? 'rotateY(0deg)' : 'rotateY(180deg)';
  }

  function syncCars() {
    setX(civCar,    civX);
    setX(policeCar, policeX);
    setFace(civCar,    direction);
    setFace(policeCar, direction);
  }

  // ── Animation loop ────────────────────────────────────
  function tick() {
    const w = window.innerWidth;

    civX    += speed * direction;
    // Police always trails the civ car by GAP in the direction of travel
    policeX  = civX - GAP * direction;

    // Wrap around edges
    if (direction === 1 && civX > w + CAR_WIDTH) {
      civX    = -CAR_WIDTH;
      policeX = civX - GAP;
    } else if (direction === -1 && policeX < -(CAR_WIDTH + GAP)) {
      civX    = w + CAR_WIDTH;
      policeX = civX + GAP;
    }

    syncCars();
    rafId = requestAnimationFrame(tick);
  }

  // ── Playback control ──────────────────────────────────
  function startPlaying(spd, dir) {
    if (rafId) cancelAnimationFrame(rafId);
    speed     = spd;
    direction = dir;
    isPlaying = true;
    rafId     = requestAnimationFrame(tick);
    updateUI();
  }

  function stopPlaying() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    isPlaying = false;
    ffActive  = false;
    rewActive = false;
    updateUI();
  }

  // ── UI state ──────────────────────────────────────────
  const ACTIVE_COLOR   = 'rgb(2, 209, 2)';
  const INACTIVE_COLOR = '';

  function updateUI() {
    playBtn.style.display  = isPlaying ? 'none'  : 'block';
    pauseBtn.style.display = isPlaying ? 'block' : 'none';

    // Highlight toggle buttons when active
    fastFwdBtn.querySelector('i').style.color = ffActive  ? ACTIVE_COLOR : INACTIVE_COLOR;
    rewindBtn.querySelector('i').style.color  = rewActive ? ACTIVE_COLOR : INACTIVE_COLOR;
  }

  // ── Button listeners ──────────────────────────────────
  playBtn.addEventListener('click', () => {
    ffActive  = false;
    rewActive = false;
    startPlaying(BASE_SPEED, 1);
  });

  pauseBtn.addEventListener('click', () => {
    stopPlaying();
  });

  fastFwdBtn.addEventListener('click', () => {
    if (!isPlaying && !ffActive) {
      // if paused, pressing FF starts playback in fast-forward
      ffActive  = true;
      rewActive = false;
      startPlaying(FAST_SPEED, 1);
    } else if (ffActive) {
      // toggle off → back to normal speed
      ffActive = false;
      startPlaying(BASE_SPEED, 1);
    } else {
      // playing normally → switch to fast-forward
      ffActive  = true;
      rewActive = false;
      startPlaying(FAST_SPEED, 1);
    }
  });

  rewindBtn.addEventListener('click', () => {
    if (!isPlaying && !rewActive) {
      rewActive = true;
      ffActive  = false;
      startPlaying(REW_SPEED, -1);
    } else if (rewActive) {
      // toggle off → back to normal forward
      rewActive = false;
      startPlaying(BASE_SPEED, 1);
    } else {
      // playing → switch to rewind
      rewActive = true;
      ffActive  = false;
      startPlaying(REW_SPEED, -1);
    }
  });

  // ── Init ─────────────────────────────────────────────
  syncCars();
  updateUI();
});
