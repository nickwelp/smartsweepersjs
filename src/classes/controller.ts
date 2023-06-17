import Vector2d from "./vector2d";
import GeneticAlgorithm, { Genome } from "./geneticAlgorithm";
import { iNumElite, iNumMines, iNumTicks, iNumSweepers, dMutationRate, dCrossoverRate, dMineScale } from "../config";
import Minesweeper from "./mineSweeper";
import TwoDimensionalMatrix from "./twoDimensionalMatrix";


const numberSweeperVertices = 16;
const sweeperVertices: Vector2d[] = new Array(numberSweeperVertices);
sweeperVertices[0] = new Vector2d(-1, -1);
sweeperVertices[1] = new Vector2d(-1, 1);
sweeperVertices[2] = new Vector2d(-0.5, 1);
sweeperVertices[3] = new Vector2d(-0.5, -1);
sweeperVertices[4] = new Vector2d(0.5, -1);
sweeperVertices[5] = new Vector2d(1, -1);
sweeperVertices[6] = new Vector2d(1, 1);
sweeperVertices[7] = new Vector2d(0.5, 1);
sweeperVertices[8] = new Vector2d(-0.5, -0.5);
sweeperVertices[9] = new Vector2d(0.5,-0.5);
sweeperVertices[10] = new Vector2d(-0.5, 0.5);
sweeperVertices[11] = new Vector2d(-.25,0.5);   
sweeperVertices[12] = new Vector2d(-0.25, 1.75);
sweeperVertices[13] = new Vector2d(0.25, 1.75);
sweeperVertices[14] = new Vector2d(0.25, 0.5);
sweeperVertices[15] = new Vector2d(0.5, 0.5);

const numberMineVertices = 4;
const mine: Vector2d[] = new Array(numberMineVertices); 
mine[0] = new Vector2d(-1, -1);
mine[1] = new Vector2d(-1, 1);
mine[2] = new Vector2d(1, 1);
mine[3] = new Vector2d(1, -1);

class Controller {
    // storage for the population of genomes
    vecThePopulation: Genome[];
    // array of sweepers
    vecSweepers: Minesweeper[];
    // array of mines
    vecMines: Vector2d[] = [];
    // size of population
    numberOfSweepers: number;
    // amount of mines in the world
    numberOfMines: number;
    // amount of weights in neural net
    numberOfWeightsInNN: number;

    // pointer to the GA class
    private geneticAlgorithm: GeneticAlgorithm;

    // vertex buffer for the sweeper shape's vertices
    private sweeperVB: Vector2d[] = [];
    // vertex buffer for the mine shape's vertices
    private mineVB: Vector2d[] = [];

    private fastRender: boolean = false;

    private iTick: number = 0;

    private iGeneration: number = 0;

    // stores the average fitness per generation for use in graphing.
    private vecAvFitness: number[] = [];
    // stores the best fitness per generation
    private vecBestFitness: number[] = [];
    private pauseSwitch: HTMLInputElement;
    private canvas: HTMLCanvasElement;

    private pause: Function;
    private unPause: Function;
    constructor(pause:Function, unPause:Function){
        const label = document.createElement("label");
        label.innerText = "Pause";
        const pauseSwitch = document.createElement("input");
        pauseSwitch.type = "checkbox";
        pauseSwitch.checked = false;
        pauseSwitch.addEventListener("change", (e) => {
            // @ts-ignore
            if(e.target.checked) {
                this.pause();
            } else {
                this.unPause();
            }
        });
        label.appendChild(pauseSwitch);
        this.pauseSwitch = pauseSwitch;
        this.pause = pause;
        this.unPause = unPause;
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        setTimeout(() => {
            document.body.appendChild(canvas);
            document.body.appendChild(label);
        },0);
        this.canvas = canvas;
        this.numberOfSweepers = iNumSweepers;
        this.numberOfMines = iNumMines;
        this.vecThePopulation = [];
        this.vecSweepers = new Array(this.numberOfSweepers).fill('').map(() => new Minesweeper());
        this.vecMines = new Array(this.numberOfMines).fill('').map(() => new Vector2d(Math.random() * canvas.width, Math.random() * canvas.height));

        // get the total number of weights used in the sweepers
        // neural network so we can initialise the GA
        this.numberOfWeightsInNN = this.vecSweepers[0].getNumberOfWeights();

        // initialise the Genetic Algorithm class
        this.geneticAlgorithm = new GeneticAlgorithm(
            this.numberOfSweepers,
            dMutationRate,
            dCrossoverRate,
            this.numberOfWeightsInNN);

        // Get the weights from the GA and insert into the sweepers brains
        this.vecThePopulation = this.geneticAlgorithm.getChromos();
        this.vecSweepers.forEach((_, i) => {
            this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
        });
        
       
        // fill the vertex buffers
        this.sweeperVB = sweeperVertices.map((v) => new Vector2d(v.x, v.y));
        this.mineVB = mine.map((v) => new Vector2d(v.x, v.y));

    }

    destroy(){}

    render():void{
        const generationText = `Generation: ${this.iGeneration}`;
        const ctx = this.canvas.getContext("2d");
        if(!ctx) {
            console.log("no context");
            return;
        }
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.font = "13px arial";
        ctx.closePath();
        ctx.strokeText(generationText, 5, 15);
        if(!this.fastRender){
            this.vecMines.forEach((_, i) => {
                ctx.beginPath();
                ctx.strokeStyle = "green";
                ctx.lineWidth = 1;
                const mineVB = this.mineVB.map((v) => new Vector2d(v.x, v.y));
                this.worldTransform(mineVB, this.vecMines[i]);
                ctx.moveTo(mineVB[0].x, mineVB[0].y);
                for (let vert=1; vert<mineVB.length; vert++) {
                    ctx.lineTo(mineVB[vert].x, mineVB[vert].y);
                }
                ctx.lineTo(mineVB[0].x, mineVB[0].y);
                ctx.stroke();
                ctx.closePath();
            });
            this.vecSweepers.forEach((_, i) => {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 1;
                if(i>=iNumElite){
                    ctx.strokeStyle = "black";
                }
                const sweeperVB = this.sweeperVB.map((v) => new Vector2d(v.x, v.y));
                this.vecSweepers[i].worldTransform(sweeperVB);
                ctx.moveTo(sweeperVB[0].x, sweeperVB[0].y);
                for (let vert=1; vert<sweeperVB.length; vert++) {
                    ctx.lineTo(sweeperVB[vert].x, sweeperVB[vert].y);
                }
                ctx.lineTo(sweeperVB[0].x, sweeperVB[0].y);
                ctx.stroke();
                ctx.closePath();
                // confirm("that is one SWEEPER")
            });
            // throw new Error("that is one frame");
        } else {
            this.plotStats(ctx);
        }
        // confirm("that is one frame");
    }

    worldTransform(vBuffer:Vector2d[], vPos: Vector2d):void{
        // create a transformation matrix
        const matTransform = new TwoDimensionalMatrix();
        // scale
        matTransform.scale(dMineScale, dMineScale);

        // and translate
        matTransform.translate(vPos.x, vPos.y);
        // now transform the ships vertices
        matTransform.transformPoints(vBuffer);

    }

    //-------------------------------------Update-----------------------------
    //
    //	This is the main workhorse. The entire simulation is controlled from here.

    update = ():boolean => {
        // throw new Error("Update Method not implemented.");
        //run the sweepers through CParams::iNumTicks amount of cycles. During
        //this loop each sweepers NN is constantly updated with the appropriate
        //information from its surroundings. The output from the NN is obtained
        //and the sweeper is moved. If it encounters a mine its fitness is
        //updated appropriately,
        if(this.iTick++ < iNumTicks) {
            this.vecSweepers.forEach((_, i) => {
                if(!this.vecSweepers[i].update(this.vecMines)){
                    console.log("error in update, wrong amount of NN inputs");
                    return false;
                }
                const grabHit = this.vecSweepers[i].checkForMine(this.vecMines, dMineScale);
                if (grabHit >= 0) {
                    // we have discovered a mine so increase fitness
                    this.vecSweepers[i].incrementFitness();
                    // mine found so replace the mine with another at a random 
                    // position
                    this.vecMines[grabHit] = new Vector2d(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
                    
                }
                this.vecThePopulation[i].dFitness = this.vecSweepers[i].fitness();
            });
        }
        // another generation is completed

        // run the GA and update sweepers with their new NNs
        else {
            // update the stats to be used in our stat window
            this.vecAvFitness.push(this.geneticAlgorithm.averageFitness());
            this.vecBestFitness.push(this.geneticAlgorithm.bestFitness());
            this.iGeneration++;
            // reset cycles
            this.iTick = 0;
            // run the GA to create a new population
            this.vecThePopulation = this.geneticAlgorithm.epoch(this.vecThePopulation);
            // insert the new (hopefully)improved brains back into the sweepers
            // and reset their positions etc
            this.vecSweepers.forEach((_, i) => {
                this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
                this.vecSweepers[i].reset();
            });
        }
        return true;
    }

    plotStats(ctx: CanvasRenderingContext2D | null):void{
        if(!ctx) return;
        const s = `Best Fitness: ${this.geneticAlgorithm.bestFitness()}`;
        const s2 = `Average Fitness: ${this.geneticAlgorithm.averageFitness()}`;
        ctx.font = "16px arial";
        ctx.strokeText(s, 5, 5);
        ctx.strokeText(s2, 5, 25);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 200);
        ctx.lineTo(200, 200);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, 200);
        for(let i=0; i<this.vecAvFitness.length; i++){
            ctx.lineTo(i, 200 - this.vecAvFitness[i]);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, 200);
        for(let i=0; i<this.vecBestFitness.length; i++){
            ctx.lineTo(i, 200 - this.vecBestFitness[i]);
        }
        ctx.stroke();
        ctx.closePath();
    }
    // accessor methods
    getFastRender(){return this.fastRender}
    setFastRender(value:boolean){this.fastRender = value}
    fastRenderToggler(){this.fastRender = !this.fastRender} 
};
export default Controller;
