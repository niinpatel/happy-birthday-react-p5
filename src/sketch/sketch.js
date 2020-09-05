import Dot from './Dot';
import fontFile from './AvenirNextLTPro-Demi.otf';

const defaultFrameRate = 30; // low framerate to avoid too much strain on mobile phones


export default (sketch) => {
  let font;
  let dots;
  let parent;
  let firstWordPoints;
  let secondWordPoints;
  let thirdWordPoints = [];

  sketch.preload = () => {
    font = sketch.loadFont(fontFile);
  };

  const fillDots = (width, height) => {
    dots = [];
    if (width > height) {
      // console.log('desktop view')
      let firstWord = 'Happy Birthday'
      let secondWord = 'Trisha'
      firstWordPoints = font.textToPoints(firstWord, width * 0.04, height * 0.33, width * 0.12)
      secondWordPoints = font.textToPoints(secondWord, width * 0.05, height * 0.83, width * 0.3);
    } else {
      // console.log('in mobile view')
      let firstWord = 'Happy'
      let secondWord = 'Birthday';
      let thirdWord = 'Trisha'
      firstWordPoints = font.textToPoints(firstWord, width * 0.01, height * 0.3, width * 0.3);
      secondWordPoints = font.textToPoints(secondWord, width * 0.01, height * 0.5, width * 0.25);
      thirdWordPoints = font.textToPoints(thirdWord, width * 0.01, height * 0.7, width * 0.32);
    }

    firstWordPoints.forEach((point) => {
      dots.push(new Dot(point.x, point.y, sketch));
    });

    secondWordPoints.forEach((point) => {
      dots.push(new Dot(point.x, point.y, sketch));
    });


    thirdWordPoints.forEach((point) => {
      dots.push(new Dot(point.x, point.y, sketch));
    });
  };

  sketch.setup = () => {
    parent = document.getElementById('canvas-parent');
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    sketch.createCanvas(width, height);
    fillDots(width, height);
    sketch.frameRate(defaultFrameRate);
  };

  sketch.draw = () => {
    sketch.clear();
    dots.forEach((dot) => {
      dot.update();
      dot.applyAllForces();
      dot.show();
    });
  };
};
