// width set to the <iframe> tag width, height 500px
let canvas_width = window.innerWidth;
let canvas_height = 500;
// empty array for particles
let particles = [] 
// STP and additional variables
let number_of_particles = 53; //53.5
let volume = 100;
let particle_temperature = 273.15;
let space_width = canvas_width * 0.5; //20 nm
let space_height = 380; //10 nm
let actual_width = 20 * Math.pow(10, -9);
let actual_depth = 10 * Math.pow(10, -9);
let actual_height = 10 * Math.pow(10, -9);
// constants
const boltzmann_constant = 1.38 * Math.pow(10, -23);
const pressure = number_of_particles * boltzmann_constant * particle_temperature / actual_depth / actual_height / (space_width * Math.pow(10, -9) / 25);
const volume_over_temp = boltzmann_constant * number_of_particles / pressure;
const space_width_minimum = volume_over_temp * 50 / actual_depth / actual_height * Math.pow(10, 9) * 25
// html elements
let slider_temperature, text_temperature, text_volume;

function setup() {
    // initiation of the canvas and setting the background color
    createCanvas(canvas_width, canvas_height);
    background(10, 68, 108); 
    // fill up the particle array with particle objects
    for (let i = 0; i <= number_of_particles; i++) {
        particles.push(new Particle());
    }
    // create the html elements
    slider_temperature = createSlider(50, particle_temperature, particle_temperature, 1);
    slider_temperature.addClass("sliders");
    text_temperature = createElement('h4', "M");
    text_temperature.addClass("text_elements");
    text_volume = createElement('h4', "M");
    text_volume.addClass("text_elements");
}
    
function draw() {
    // Check for temperature change
    if (particle_temperature != slider_temperature.value()) {
        // adjust the velocity for every particle if temperature is changed
        for (let particle of particles) {
            particle.velocity.mult(sqrt(slider_temperature.value() / particle_temperature));
        }
        // update temperature
        particle_temperature = slider_temperature.value();
        // change the width and volume as pressure is constant and temperature changed
        space_width = volume_over_temp * particle_temperature / actual_depth / actual_height * Math.pow(10, 9) * 25;
        actual_width = space_width / 25 * Math.pow(10, -9);
        volume = actual_depth * actual_height * actual_width;
    }
    // "refresh"/ clean the container part of the canvas 
    noStroke();
    fill(10, 68, 108);
    rect(0, 0, canvas_width * 0.5 + 55, canvas_height);
    noFill();
    // position and display the html elements
    stroke(255);
    translate(50, 50);
    slider_temperature.position(50, canvas_height - 60);
    text_temperature.position(55, canvas_height - 60);
    text_volume.position(55, canvas_height - 40);
    text_temperature.html("Temperature: " + str(round(particle_temperature)) + " K");
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
    graph();
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
    text("V", -380, 15);
    rotate(radians(-90));
    text("T", canvas_width * 0.3 - 10, 15);
    // point on the graph, scaled
    strokeWeight(5);
    point(map(slider_temperature.value(), 50, 273, 10, canvas_width * 0.3), -map(space_width, space_width_minimum, canvas_width * 0.5, 10, 390));
    strokeWeight(1);
    noStroke();      
}
