// width set to the <iframe> tag width, height 500px
let canvas_width = window.innerWidth;
let canvas_height = 500;
// empty array for particles
let particles = [] 
// STP and additional variables
let number_of_particles = 53; //53.5
let pressure, volume;
let particle_temperature = 273.15;
let space_width = canvas_width * 0.5; //20 nm
let space_height = 380; //10 nm
let actual_width = 20 * Math.pow(10, -9)
let actual_depth = 10 * Math.pow(10, -9)
let actual_height = 10 * Math.pow(10, -9)
// constants
const boltzmann_constant = 1.38 * Math.pow(10, -23);
// html elements
let slider_temperature, text_pressure, text_temperature;

function setup() {
    // initiation of the canvas and setting the background color
    createCanvas(canvas_width, canvas_height);
    background(10, 68, 108); 
    // fill up the particle array with particle objects
    for (let i = 0; i <= number_of_particles; i++) {
        particles.push(new Particle());
    }
    // create the html elements
    slider_temperature = createSlider(10, 1000, particle_temperature, 1);
    slider_temperature.addClass("sliders");
    text_pressure = createElement('h4', "M");
    text_pressure.addClass("text_elements");
    text_temperature = createElement('h4', "M");
    text_temperature.addClass("text_elements");
}
    
function draw() {
    // Check for temperature change
    if (particle_temperature != slider_temperature.value()) {
        // adjust the velocity for every particle if temperature is changed
        for (let particle of particles) {
            particle.velocity.mult(sqrt(slider_temperature.value() / particle_temperature));
        }
        // update the temperature
        particle_temperature = slider_temperature.value()
        volume = actual_depth * actual_height * actual_width
        pressure = number_of_particles * boltzmann_constant * particle_temperature / volume;
    }
    // "refresh"/ clean the container part of the canvas
    noStroke()
    fill(10, 68, 108);
    rect(0, 0, canvas_width * 0.5 + 55, canvas_height);
    noFill();
    // position and display the html elements
    stroke(255);
    translate(50, 50);
    slider_temperature.position(50, canvas_height - 60);
    text_pressure.position(55, canvas_height - 60);
    text_temperature.position(55, canvas_height - 40);
    text_pressure.html("Pressure: " + str(round(pressure)) + " Pa");
    text_temperature.html("Temperature: " + str(round(particle_temperature)) + " K");
    // draw the container 
    stroke(255);
    rect(0, 0, space_width, space_height);
    noStroke();
    // display every particle
    for (let i = 0; i <= number_of_particles; i++) {
        particles[i].show()
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
    text("P", -380, 15);
    rotate(radians(-90));
    text("T", canvas_width * 0.3 - 10, 15);
    // point on the graph, scaled
    strokeWeight(5);
    point(map(particle_temperature, 10, 1000, 2, canvas_width * 0.3), -pressure / 1100);
    strokeWeight(1)
    noStroke();
}

  