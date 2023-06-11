import Vector2d from "./vector2d";
import GeneticAlgorithm, { Genome } from "./geneticAlgorithm";
import { iNumCopiesElite, iNumElite, iNumMines, iNumTicks, iNumSweepers, dMutationRate, dCrossoverRate, dMineScale } from "../config";
import Minesweeper from "./mineSweeper";
import TwoDimensionalMatrix from "./twoDimensionalMatrix";


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

// NICK you were working on this and in mineSweeper.ts

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

    private canvas: HTMLCanvasElement;
    constructor(){
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.numberOfSweepers = iNumSweepers;
        this.numberOfMines = iNumMines;
        this.vecThePopulation = [];
        this.vecSweepers = [];
        for(let i=0; i<iNumSweepers; i++){
            this.vecSweepers.push(new Minesweeper());
        }
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
        for (let i=0; i<this.numberOfSweepers; i++) {
            this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
        }
        // initialize mines in random positions within the application window
        for (let i=0; i<this.numberOfMines; i++) {
            this.vecMines.push(new Vector2d(Math.random() * canvas.width, Math.random() * canvas.height));
        }
       
        // fill the vertex buffers
        for (let i=0; i<sweeper.length; i++) {
            this.sweeperVB.push(sweeper[i]);
        }
        for (let i=0; i<mine.length; i++) {
            this.mineVB.push(mine[i]);
        }   

    }

    destroy(){}

    render():void{}

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

    update():boolean{
        //run the sweepers through CParams::iNumTicks amount of cycles. During
        //this loop each sweepers NN is constantly updated with the appropriate
        //information from its surroundings. The output from the NN is obtained
        //and the sweeper is moved. If it encounters a mine its fitness is
        //updated appropriately,
        if(this.iTick++ < iNumTicks) {
            for (let i=0; i<this.numberOfSweepers; i++) {
                if(!this.vecSweepers[i].update(this.vecMines)){
                    // error
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
            }
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
            for (let i=0; i<this.numberOfSweepers; i++) {
                this.vecSweepers[i].putWeights(this.vecThePopulation[i].vecWeights);
                this.vecSweepers[i].reset();
            }
        }
        return true;
    }
    // accessor methods
    getFastRender(){return this.fastRender}
    setFastRender(value:boolean){this.fastRender = value}
    fastRenderToggler(){this.fastRender = !this.fastRender} 


};