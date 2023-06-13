import NeuralNet from "./neuralNet";
import Vector2d from "./vector2d";
import Parameters from "./parameters";
import TwoDimensionalMatrix from "./twoDimensionalMatrix";
import clamp from "../utils/clamp";

class Minesweeper {
    /* minesweeper's neural net */
    private brain: NeuralNet;
    /* position of sweeper on screen */
    private position: Vector2d;
    /* vector Mine Sweeper is to aim for, ie "look at here" */
    private lookAt: Vector2d;
    /* sweeper's rotation */
    private rotation: number;
    /* velocity of sweeper */
    private velocity: number;
    /* mines discovered */
    private minesFound: number;
    /* size of sweeper's drawing */
    private scale: number;
    /* index of closest mine */
    private closestMine: number;
    /* left track */
    private leftTrack: number;
    /* right track */
    private rightTrack: number;

    public getNumberOfWeights(): number {
        return this.brain.getNumberOfWeights();
    }

    constructor() {
        this.brain = new NeuralNet();
        this.position = new Vector2d(Math.random() * Parameters.windowWidth, Math.random() * Parameters.windowHeight);
        this.rotation = Math.random() * 2 * Math.PI;
        this.lookAt = new Vector2d(Math.sin(this.rotation) * -1,Math.cos(this.rotation));
        this.velocity = 0;
        this.minesFound = 0;
        this.scale = Parameters.sweeperScale;
        this.closestMine = 0;
        this.leftTrack = 0.16;
        this.rightTrack = 0.16;
    }

    /*****
     * reset
     * Resets the sweepers position, fitness and rotation
     * 
    */ 
    public reset(): void {
        this.position = new Vector2d(Math.random() * Parameters.windowWidth, Math.random() * Parameters.windowHeight);
        this.rotation = Math.random() * 2 * Math.PI;
        this.minesFound = 0;
    }

    /**
     * worldTransform
     * 
     * sets up a translation matrix for the sweeper according to its
     *  scale, rotation and position. Returns the transformed vertices.
     * 
     */
    public worldTransform(sweeper:Vector2d[]): void {
        const matTransform = new TwoDimensionalMatrix();
        matTransform.scale(this.scale, this.scale);
        matTransform.translate(this.position.x, this.position.y);
        matTransform.rotate(this.rotation);
        matTransform.transformPoints(sweeper);
    }

    /**
     * update() 
     * First we take sensor readings and feed these into the sweepers brain.
    * The inputs are:
    * A vector to the closest mine (x, y)
    * The sweepers 'look at' vector (x, y)
    * We receive two outputs from the brain: leftTrack & rightTrack.
    * Given a force for each track we calculate the resultant rotation 
    * and acceleration and apply to current velocity vector.
    * */
    public update(mines: Vector2d[]): Boolean {
        const inputs: number[] = [];
        const closestMine: Vector2d = new Vector2d(this.getClosestMine(mines).x, this.getClosestMine(mines).y);
        closestMine.normalize();
        inputs.push(closestMine.x);
        inputs.push(closestMine.y);
        inputs.push(this.lookAt.x);
        inputs.push(this.lookAt.y);
        const outputs: number[] = this.brain.update(inputs);
        if (outputs.length !== Parameters.numOutputs) {
            throw new Error(`Outputs length does not match number of outputs ${outputs.length}, ${Parameters.numOutputs}`);
        }

        this.leftTrack = outputs[0];
        this.rightTrack = outputs[1];

        let rotForce = this.leftTrack - this.rightTrack;
        rotForce = clamp(rotForce, -Parameters.maxTurnRate, Parameters.maxTurnRate);
        this.rotation += rotForce;
        this.velocity = this.leftTrack + this.rightTrack;
        this.lookAt.x = -Math.sin(this.rotation);
        this.lookAt.y = Math.cos(this.rotation);
        this.position.add(this.lookAt.multiply(this.velocity));
        if (this.position.x < 0) {
            this.position.x = Parameters.windowWidth;
        }
        if (this.position.x > Parameters.windowWidth) {
            this.position.x = 0;
        }
        if (this.position.y < 0) {
            this.position.y = Parameters.windowHeight;
        }
        if (this.position.y > Parameters.windowHeight) {
            this.position.y = 0;
        }
        return true;
    }

    public getClosestMine(mines: Vector2d[]): Vector2d {
        let closestMine = 0;
        let closestDistance = Number.MAX_VALUE;
        for (let i = 0; i < mines.length; i++) {
            const distance = this.position.subtract(mines[i]).magnitude();
            if (distance < closestDistance) {
                closestDistance = distance;
                closestMine = i;
            }
        }
        return mines[closestMine];
    }

    public incrementMinesFound(): void {
        this.minesFound++;
    }

    public getMinesFound(): number {
        return this.minesFound;
    }

    public getPosition(): Vector2d {
        return this.position;
    }
    public checkForMine(mines: Vector2d[], size:number): number {
        const distance = this.position.subtract(mines[this.closestMine]).magnitude();
        if (distance < (size + 5)) {
            return this.closestMine;
        }
        return -1;
    }


    // accessors
    incrementFitness(): void { this.incrementMinesFound(); }

	fitness(){return this.minesFound;}
  
    putWeights(w:number[]){this.brain.putWeights(w);}

}

export default Minesweeper;