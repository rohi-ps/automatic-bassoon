//yala yolo 

const randomMiddleware = (req, res, next) => {
  console.log('Random middleware executed');
  next();
}