//yala yolo 

const randomMiddleware = (req, res, next) => {
  console.log('Random middleware executed');
  next();
}

module.exports = randomMiddleware;

// --- IGNORE ---