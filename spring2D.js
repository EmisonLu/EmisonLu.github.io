function Spring2D(xpos, ypos, m, g, b_) {
	this.vx = 0;
	this.vy = 0;
	this.x;
	this.y;
	this.stiffness = 0.2;
	this.damping = 0.95;
	this.r = height / h;
	this.G = 0.4;

	this.x = xpos;
	this.y = ypos;
	this.loc = createVector(this.x, this.y); //location
	//this.mass=m;   //m is not used, because we use brightness(ellipse's size) as mass 
	this.mass = b_; //  this two lines of code determines whether apply different mass to evey pixel
	this.mass = constrain(this.mass, 0.2, 6); //  this two lines of code determines whether apply different mass to evey pixel
	this.mass = map(this.mass, 0, 6, 5, 40);
	this.gravity = g;
	this.radius = b_;
	this.a = random(10); // viable a represents the breathe effect of every ellipse
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);


	this.update = function() {
		this.forceX = (this.x - this.loc.x) * this.stiffness; // spring formula
		this.ax = this.forceX / this.mass;
		this.vx = this.damping * (this.vx + this.ax); // a =F/m

		this.forceY = (this.y - this.loc.y) * this.stiffness;
		this.forceY += this.gravity; // actually we don't apply any gravity, because gravity=0
		this.ay = this.forceY / this.mass; // a =F/m
		this.vy = this.damping * (this.vy + this.ay);

		this.loc.add(this.vx, this.vy);
		this.a += 0.04;
	}

	this.show = function() {
		noStroke();
		this.change = map(sin(this.a), 0, 1, 1.8, 2.3); // using sin() function to make ellipse breathe
		fill(0);
		ellipse(this.loc.x, this.loc.y, this.radius * this.change, this.radius * this.change);
	}

	this.attraction = function() { // all the code below is applying attraction with Newton's formula

		this.force = p5.Vector.sub(createVector(mouseX, mouseY), this.loc); // calculate force direction
		this.dd = this.force.mag(); // distance
		//if (this.dd < 25) {
		this.dd = map(this.dd, 0,500,3, 85);
		//}
		//this.dd = constrain(this.dd, 2, 80);
		//this.dd = constrain(this.dd, 3.0, 55.0);  
		this.force.normalize();
		this.strength = (this.G * this.mass * 200) / (this.dd * this.dd); // F = (G * M * m ) / ( d * d )
		this.force.mult(this.strength);
		this.f = p5.Vector.div(this.force, this.mass);
		this.acceleration.add(this.f);
		this.velocity.add(this.acceleration);
		this.loc.add(this.velocity);
		this.acceleration.mult(0);
	}
}