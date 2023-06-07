import Vector2d from "./vector2d";

const numberSweeperVertices = 16;
const sweeper: Vector2d[] = new Array(numberSweeperVertices);
sweeper[0] = new Vector2d(-1, -1);
sweeper[1] = new Vector2d(-1, 1);
sweeper[2] = new Vector2d(-0.5, 1);
sweeper[3] = new Vector2d(-0.5, -1);
sweeper[4] = new Vector2d(0.5, -1);
sweeper[5] = new Vector2d(1, -1);
sweeper[6] = new Vector2d(1, 1);
sweeper[7] = new Vector2d(0.5, 1);
sweeper[8] = new Vector2d(-0.5, -0.5);
sweeper[9] = new Vector2d(0.5,-0.5);
sweeper[10] = new Vector2d(-0.5, 0.5);
sweeper[11] = new Vector2d(-.25,0.5);
sweeper[12] = new Vector2d(-0.25, 1.75);
sweeper[13] = new Vector2d(0.25, 1.75);
sweeper[14] = new Vector2d(0.25, 0.5);
sweeper[15] = new Vector2d(0.5, 0.5);




class Controller {
};