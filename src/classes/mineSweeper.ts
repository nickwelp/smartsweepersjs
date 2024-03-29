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

    static counter = 0;

    /* name from genome */
    private name: string;

    public getNumberOfWeights = (): number => {
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
        this.name = "minesweeper_" + Minesweeper.counter++;
    }

    /*****
     * reset
     * Resets the sweepers position, fitness and rotation
     * 
    */ 
    public reset = ():void => {
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
    public worldTransform = (sweeper:Vector2d[]):void => {
        const matTransform = new TwoDimensionalMatrix();
        matTransform.scale(this.scale, this.scale);
        matTransform.rotate(this.rotation % (2 * Math.PI));
        matTransform.translate(this.position.x, this.position.y);
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
    public update = (mines: Vector2d[]): Boolean => {
        const inputs: number[] = [];
        const closestMine = this.getClosestMine(mines);
        const closestMineV: Vector2d = new Vector2d(closestMine.x, closestMine.y);
        closestMineV.normalize();
        inputs.push(closestMineV.x);
        inputs.push(closestMineV.y);
        inputs.push(this.lookAt.x);
        inputs.push(this.lookAt.y);
        this.closestMine = mines.map((e) => `${e.x},${e.y}`).findIndex((e) => e ===`${closestMine.x},${closestMine.y}`);
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
        this.lookAt.x = -1 * Math.sin(this.rotation);
        this.lookAt.y = Math.cos(this.rotation);
        this.position.add(this.lookAt.multiply(this.velocity));
        if (this.position.x < 0) {
            this.position.x = (this.position.x % Parameters.windowWidth) + Parameters.windowWidth;
        }
        if (this.position.x > Parameters.windowWidth) {
            this.position.x = (this.position.x % Parameters.windowWidth)
        }
        if (this.position.y < 0) {
            this.position.y = (this.position.y % Parameters.windowHeight) + Parameters.windowHeight;
        }
        if (this.position.y > Parameters.windowHeight) {
            this.position.y = (this.position.y % Parameters.windowHeight)
        }
        return true;
    }

    public getClosestMine = (mines: Vector2d[]): Vector2d => {
        let closestMine = 0;
        let closestDistance = Number.MAX_VALUE;
        let distance = 0;
        for (let i = 0; i < mines.length; i++) {
            const temp = new Vector2d(this.position.x, this.position.y);
            distance = temp.subtract(mines[i]).magnitude();
            if (distance < closestDistance) {
                closestDistance = distance;
                closestMine = i;
            }
        }
        return mines[closestMine];
    }

    public incrementMinesFound = (): void => {
        this.minesFound++;
    }

    public getMinesFound = (): number => {
        return this.minesFound;
    }

    public getPosition = (): Vector2d => {
        return new Vector2d(this.position.x, this.position.y);
    }
    public checkForMine = (mines: Vector2d[], size:number): number => {
        const temp = this.getPosition();
        const distance = temp.subtract(mines[this.closestMine]).magnitude();
        if (distance < (size + 5)) {
            return this.closestMine;
        }
        return -1;
    }



    // accessors
    getName = (): string => { return this.name; }
    
    incrementFitness = (): void => { this.incrementMinesFound(); }

	fitness = () => {return this.minesFound;}
  
    putWeights = (w:number[], name:string) => {this.brain.putWeights([...w]); this.name = name;}

}

export default Minesweeper;