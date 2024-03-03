// width set to the <iframe> tag width, height 500px
let canvas_width = window.innerWidth;
let canvas_height = 500;
// empty array for particles
let particles = [] 
// STP and additional variables
let number_of_particles = 53;
let pressure = 0, volume = 100;
let particle_temperature = 273.15;
let space_width = canvas_width * 0.5;
// dimensions
let space_height = 380;
let actual_width = 20 * Math.pow(10, -9)
let actual_depth = 10 * Math.pow(10, -9)
let actual_height = 10 * Math.pow(10, -9)
// constants
const boltzmann_constant = 1.38 * Math.pow(10, -23);
// html elements
let slider_width, text_pressure, text_volume;

function setup() {
    // initiation of the canvas and setting the background color
    createCanvas(canvas_width, canvas_height);
    background(10, 68, 108); 
    // fill up the particle array with particle objects
    for (let i = 0; i <= number_of_particles; i++) {
        particles.push(new Particle());
    }
    // create the html elements
    slider_width = createSlider(50, space_width, space_width, 1);
    slider_width.addClass("sliders");
    text_pressure = createElement('h4', "");
    text_pressure.addClass("text_elements");
    text_volume = createElement('h4', "");
    text_volume.addClass("text_elements");
}
    
function draw() {
    // update the value of width and volume
    space_width = slider_width.value()
    actual_width = space_width / 25 * Math.pow(10, -9)
    volume = actual_depth * actual_height * actual_width
    // calculate pressure
    pressure = number_of_particles * boltzmann_constant * particle_temperature / volume;
    // "refresh"/ clean the container part of the canvas
    noStroke()
    fill(10, 68, 108);
    rect(0, 0, canvas_width * 0.5 + 55, canvas_height);
    noFill();
    // position and display the html elements
    stroke(255);
    translate(50, 50);
    slider_width.position(50, canvas_height - 60);
    text_pressure.position(55, canvas_height - 60);
    text_volume.position(55, canvas_height - 40);
    text_pressure.html("Pressure: " + str(round(pressure)) + " Pa");
    text_volume.html("Volume: " + str(round(volume * Math.pow(10, 27))) + " nm^3");
    // draw the container
    stroke(255);
    rect(0, 0, space_width, space_height);
    noStroke();
    // display every particle
    for (let i = 0; i <= number_of_particles; i++) {
        particles[i].show();
    }
    // display the graph
    graph()
}

function graph() {
    // translate to 0, 0 of the graph
    translate(canvas_width * 0.45 + 100, space_height);
    stroke(255);
    fill(255);
    // x and y axis
    line(0, 0, 0, -390);
    line(0, 0, canvas_width * 0.3, 0);
    // letters near the axis
    rotate(radians(90));
    text("P", -380, 15);
    rotate(radians(-90));
    text("V", canvas_width * 0.3 - 10, 15);
    // point on the graph, scaled
    strokeWeight(5);
    point(space_width * 0.5, -pressure * 3 / 10000);
    strokeWeight(1)
    noStroke();
}


