import p5 from 'p5';

export default class Dot {
  constructor(x, y, sketch) {
    this.sketch = sketch;
    this.position = this.sketch.createVector(
      this.sketch.random(this.sketch.width),
      this.sketch.random(this.sketch.height),
    );

    this.target = this.sketch.createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = p5.Vector.random2D();
    this.zeroVector = this.sketch.createVector(0, 0); // don't modify

    this.radius = 8;
    this.maxSpeed = 12;
    this.maxForce = 4;
    this.maxMagnitude = 50;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    this.sketch.stroke(255);
    this.sketch.fill(0);
    this.sketch.ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }

  applyAllForces() {
    this.applyMouseFleeForce();
    this.applyArriveForce();
  }

  applyMouseFleeForce() {
    const previousMouseX = this.sketch.pmouseX;
    const previousMouseY = this.sketch.pmouseY;
    const currentMouseX = this.sketch.mouseX;
    const currentMouseY = this.sketch.mouseY;
    if (previousMouseX !== currentMouseX || previousMouseY !== currentMouseY) {
      const mouse = this.sketch.createVector(currentMouseX, currentMouseY);
      const fleeForce = this.flee(mouse);
      this.applyForce(fleeForce);
    }
  }

  applyArriveForce() {
    const arriveForce = this.arrive(this.target);
    this.applyForce(arriveForce);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flee(target) {
    const desired = p5.Vector.sub(target, this.position);
    const desiredMagnitude = desired.mag();

    if (desiredMagnitude < this.maxMagnitude) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      const steeringForce = p5.Vector.sub(desired, this.velocity);
      steeringForce.limit(this.maxForce);
      return steeringForce.mult(7);
    }

    return this.zeroVector;
  }

  arrive(target) {
    const desired = p5.Vector.sub(target, this.position);
    const desiredMagnitude = desired.mag();

    let speed = this.maxSpeed;
    if (desiredMagnitude < this.maxMagnitude) {
      speed = this.sketch.map(desiredMagnitude, 0, 100, 0, this.maxSpeed);
    }

    desired.setMag(speed);
    const steeringForce = p5.Vector.sub(desired, this.velocity);
    steeringForce.limit(this.maxForce);

    return steeringForce;
  }
}
