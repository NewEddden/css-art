const keysPressed = {};
let currentRotationAngle = 0;

function updatePosition() {
  const isedanContainer = document.querySelector('.IsedanContainer');
  const step = 5;
  const verticalStep = 10;

  let currentPosition = parseInt(window.getComputedStyle(isedanContainer).right, 10);
  let currentPositionBottom = parseInt(window.getComputedStyle(isedanContainer).bottom, 10);

  const containerWidth =
    isedanContainer.offsetWidth * parseFloat(window.getComputedStyle(isedanContainer).scale);
  const leftBoundary = 0;
  const rightBoundary = window.innerWidth - containerWidth;

  const initialBottom = -130;
  const minBottom = initialBottom;
  const maxBottom = initialBottom + 20;

  if (keysPressed['ArrowLeft']) {
    currentPosition += step;
    if (currentPosition > rightBoundary) currentPosition = rightBoundary;
    currentRotationAngle = 180;
  }
  if (keysPressed['ArrowRight']) {
    currentPosition -= step;
    if (currentPosition < leftBoundary) currentPosition = leftBoundary;
    currentRotationAngle = 0;
  }
  if (keysPressed['ArrowUp']) {
    currentPositionBottom += verticalStep;
    if (currentPositionBottom > maxBottom) currentPositionBottom = maxBottom;
  }
  if (keysPressed['ArrowDown']) {
    currentPositionBottom -= verticalStep;
    if (currentPositionBottom < minBottom) currentPositionBottom = minBottom;
  }

  isedanContainer.style.right = currentPosition + 'px';
  isedanContainer.style.bottom = currentPositionBottom + 'px';
  isedanContainer.style.transform = `rotateY(${currentRotationAngle}deg)`;

  requestAnimationFrame(updatePosition);
}

document.addEventListener('keydown', (event) => { keysPressed[event.key] = true; });
document.addEventListener('keyup',   (event) => { keysPressed[event.key] = false; });

requestAnimationFrame(updatePosition);
