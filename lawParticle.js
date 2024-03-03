
class Particle {
    // constructor
        constructor() {
        // Random position in bounds and random velocity with a magnitude in range of 2 to 4
        this.position = createVector(random(0, space_width), random(0, space_height));
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.velocity.setMag(random(2, 4));
    }
    // update the position, display and check for edge collision
    show() {
        // draw the circle representing the particle
        fill(229, 107, 111);
        circle(this.position.x, this.position.y, 10);
        this.position.add(this.velocity);
        // check left border
        if (this.position.x <= 5) {
            this.position.x = 5;
            this.velocity.x *= -1;
        }
        // check right border
        else if (this.position.x >= space_width - 5) {
            this.position.x = space_width - 5;
            this.velocity.x *= -1;
        }
        // check top border
        if (this.position.y <= 5) {
            this.position.y = 5;
            this.velocity.y *= -1;
        }
        // check bottom border
        else if (this.position.y >= space_height - 5) {
            this.position.y = space_height - 5;
            this.velocity.y *= -1;
        }
    }
}