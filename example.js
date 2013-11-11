var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2AABB = Box2D.Collision.b2AABB;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2FilterData = Box2D.Dynamics.b2FilterData;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var worldScale = 30;

//define the b2d world
var world = new b2World(new b2Vec2(0,10), true);

//keyboard stuff
window.addEventListener('keydown',handleKeyDown,true);   
window.addEventListener('keyup',handleKeyUp,true);
//array for keyboard input
var keys = [];

//get the canvas context for debug draw
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//debug stuff
var debugDraw = new b2DebugDraw();
debugDraw.SetSprite(ctx);
debugDraw.SetDrawScale(30.0);
debugDraw.SetFillAlpha(0.5);
debugDraw.SetLineThickness(1.0);
debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
world.SetDebugDraw(this.debugDraw);


//make the ground
var bodyDef = new b2BodyDef;
bodyDef.type = b2Body.b2_staticBody;
bodyDef.position.Set(400/worldScale,400/worldScale);
bodyDef.userData="ground";
var polygonShape = new b2PolygonShape;
polygonShape.SetAsBox(800/2/worldScale,20/2/worldScale);
var fixtureDef = new b2FixtureDef;
fixtureDef.density = 1.0;
fixtureDef.friction = 0.0;
fixtureDef.restitution = 0.0;
fixtureDef.shape = polygonShape;
var body = world.CreateBody(bodyDef);
body.CreateFixture(fixtureDef);

//make the 'player'
bodyDef.type = b2Body.b2_dynamicBody;
bodyDef.position.Set(400/worldScale, 380/worldScale);
bodyDef.userData = "player";
bodyDef.allowSleep = false;
polygonShape.SetAsBox(20/2/worldScale,30/2/worldScale);
body = world.CreateBody(bodyDef);
body.CreateFixture(fixtureDef);

//call update at 60fps
window.setInterval(update, 1000 / 60);

//update
function update() {
	for(var b = this.world.m_bodyList; b != null; b = b.m_next){
		if(b.GetUserData() == "player"){
			if(keys[37]){
				b.SetLinearVelocity(new b2Vec2(-5,b.GetLinearVelocity().y));
			}
			else if(keys[39]){
				b.SetLinearVelocity(new b2Vec2(5,b.GetLinearVelocity().y));
			}
			else if(!keys[37] || !keys[39]){
				b.SetLinearVelocity(new b2Vec2(0,b.GetLinearVelocity().y));
			}
			
			if(keys[38]){
				b.ApplyForce(new b2Vec2(50,-20), b.GetWorldCenter());
			}
			
			if(keys[13]){
				b.SetPosition(new b2Vec2(120/worldScale, 100/worldScale));
			}
		}
	}
	world.Step(1 / 60, 10, 10);
	world.DrawDebugData();
	world.ClearForces();
};

//keyboard
function handleKeyDown(evt){  
	keys[evt.keyCode] = true;  
}  
function handleKeyUp(evt){  
	keys[evt.keyCode] = false;  
} 
