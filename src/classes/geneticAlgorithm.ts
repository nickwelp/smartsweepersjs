import Parameters from "./parameters";
let genomeCoutner = 0;

export class Genome {
  vecWeights: number[] = [];
  dFitness: number = 0;
  private name:string;
  static sort(a:Genome,b:Genome){
    return a.dFitness - b.dFitness;
  }
  getName():string{
    return this.name;
  }
  setName(name:string){
    this.name = name;
  }
  constructor(w:number[] = [], dFitness:number = 0, name:string = "") {
    this.name = name?name:`Genome_${genomeCoutner++}`;
    if(w.length < 1){
      this.dFitness = 0;
    } else if (w.length > 0){
      this.vecWeights = [...w];
      this.dFitness = dFitness;
    }
  }
}


class GeneticAlgorithm {
  private iPopSize: number;
  private dMutationRate: number;
  private dCrossoverRate: number;
  private iChromoLength: number;
  private dTotalFitness: number;
  private cGeneration: number;
  private iFittestGenome: number;
  private dBestFitness: number;
  private dWorstFitness: number;
  private dAverageFitness: number;
  private vecPop: Genome[] = [];
  private medianFitness: number;
  
  constructor(popsize: number, MutRat: number, CrossRat: number, numweights: number){
    this.iPopSize = popsize;
    this.dMutationRate = MutRat;
    this.dCrossoverRate = CrossRat;
    this.iChromoLength = numweights;
    this.medianFitness = 0;
    this.dTotalFitness = 0;
    this.cGeneration = 0;
    this.iFittestGenome = 0;
    this.dBestFitness = 0;
    this.dWorstFitness = 99999999;
    this.dAverageFitness = 0;
    //initialise population with chromosomes consisting of random
	  //weights while all fitnesses are zero
    for (let i=0; i<this.iPopSize; i++) {
      this.vecPop.push(new Genome([],0));
      for (let j=0; j<this.iChromoLength; j++){
        this.vecPop[i].vecWeights.push(Math.random());
      }
    }
  }

  //---------------------------------mutate--------------------------------
  //
  //	mutates a chromosome by perturbing its weights by an amount not 
  //	greater than dMaxPerturbation
  //  this mutates the chromo in place
  //-----------------------------------------------------------------------
  mutate(chromo: number[]):number[] {
    // traverse the chromosome and mutate each weight dependent
    // on the mutation rate
    const newChromo = [];
    for (let i=0; i<chromo.length; i++) {
      // do we perturb this weight?
      if (Math.random() < this.dMutationRate){
        // add or subtract a small value to the weight
        // Math.random() - Math.random() returns a value between -1 and 1
        newChromo[i] = chromo[i] + ((Math.random() - Math.random()) * Parameters.maxPerturbation);
      } else {
        // no mutation
        newChromo[i] = chromo[i];
      }
    }
    return newChromo;
  }


  //----------------------------------getChromoRoulette()------------------
  //
  //	returns a chromo based on roulette wheel sampling
  //
  //-----------------------------------------------------------------------
  getChromoRoulette():Genome {
    //generate a random number between 0 & total fitness count
    
    const slice = Math.random() * this.dTotalFitness;
    //this will be set to the chosen chromosome
    let theChosenOne;
    
    //go through the chromosomes adding up the fitness so far
    let fitnessSoFar = 0;
    for (let i=0; i<this.vecPop.length; i++){
      fitnessSoFar += this.vecPop[i].dFitness;
      //if the fitness so far > random number return the chromo at 
      //this point
      if (fitnessSoFar >= slice){
        theChosenOne = this.vecPop[i];
        break;
      }
    }
    if(typeof theChosenOne === "undefined") throw new Error('not a genome!');
    return new Genome([...theChosenOne.vecWeights], theChosenOne.dFitness, theChosenOne.getName());
  }

  //-------------------------------------crossover()-----------------------
  //	
  //  given parents and storage for the offspring this method performs
  //	crossover according to the GAs crossover rate
  //-----------------------------------------------------------------------
  crossover(mum:number[], dad:number[], baby1:number[], baby2:number[]){
    //just return parents as offspring dependent on the rate
    //or if parents are the same
    if ( (Math.random() > this.dCrossoverRate) || (mum.join('') === dad.join(''))) {
      mum.forEach(x => baby1.push(x));
      dad.forEach(x => baby2.push(x));
      return;
    }

    //determine a crossover point
    const cp = Math.round(Math.random() * (mum.length - 1));
    //create the offspring
    for (let i=0; i<cp; i++){
      baby1.push(mum[i]);
      baby2.push(dad[i]);
    }

    for (let i=cp; i<mum.length; i++){
      baby1.push(dad[i]);
      baby2.push(mum[i]);
    }
    return;
  }



  //-----------------------------------epoch()-----------------------------
  //
  //	takes a population of chromosones and runs the algorithm through one
  //	 cycle.
  //	Returns a new population of chromosones.
  //
  //-----------------------------------------------------------------------
  epoch(oldPop:Genome[]):void{
    //assign the given population to the classes population
    console.log(`this.vecPop: ${JSON.stringify(this.vecPop.map((g)=>g.getName()))}`);
    console.log(`oldPop: ${JSON.stringify(oldPop.map((g)=>g.getName()))}`);
    this.vecPop = oldPop;

    //reset the appropriate variables
    this.reset();

    //sort the population (for scaling and elitism)
    this.vecPop.sort(Genome.sort);

    //calculate best, worst, average and total fitness
    this.calculateBestWorstAvTot();
    
    //create a temporary vector to store new chromosones
    const vecNewPop:Genome[] = [];

    //Now to add a little elitism we shall add in some copies of the
    //fittest genomes. Make sure we add an EVEN number or the roulette
    //wheel sampling will crash
    if (!(Parameters.numCopiesElite * Parameters.numElite % 2)){
      this.grabNBest(Parameters.numElite, Parameters.numCopiesElite, vecNewPop);
    } else {
      console.log('error: numCopiesElite * numElite is not even');
    }
    
    //now we enter the GA loop
    //repeat until a new population is generated
    while (vecNewPop.length < this.iPopSize){
      //grab two chromosones
      const mum = this.getChromoRoulette();
      const dad = this.getChromoRoulette();

      //create some offspring via crossover
      const baby1:number[] = [];
      const baby2:number[] = [];


      this.crossover(mum.vecWeights, dad.vecWeights, baby1, baby2);
      //now we mutate
      const mutieBaby1 = this.mutate(baby1);
      const mutieBaby2 = this.mutate(baby2);
      // console.log(`mutieBaby1: ${JSON.stringify(mutieBaby1)}`)
      //now copy into vecNewPop population
      vecNewPop.push(new Genome([...mutieBaby1], 0));
      vecNewPop.push(new Genome([...mutieBaby2], 0));
    }

    //finished so assign new pop back into m_vecPop
    this.vecPop = vecNewPop;
    oldPop.length = 0;
    oldPop.push(...this.vecPop);
  }

  
  //-------------------------grabNBest----------------------------------
  //
  //	This works like an advanced form of elitism by inserting NumCopies
  //  copies of the NBest most fittest genomes into a population vector
  //--------------------------------------------------------------------

  grabNBest(nBest:number, numCopies:number,pop:Genome[]){
    let nB = nBest;
    //add the required amount of copies of the n most fittest 
    //to the supplied vector
    while(nB--){
      for (let i=0; i<numCopies; i++){
        pop.push(
          new Genome([
            ...this.vecPop[(this.vecPop.length - 1) - nB].vecWeights],  
            0, 
            this.vecPop[(this.vecPop.length - 1) - nB].getName())
        );
      }
    }
  }
  
  //-----------------------calculateBestWorstAvTot-----------------------	
  //
  //	calculates the fittest and weakest genome and the average/total 
  //	fitness scores
  //---------------------------------------------------------------------
  calculateBestWorstAvTot(){
    this.dTotalFitness = 0;
    let highestSoFar = 0;
    let lowestSoFar  = 9999999;
    this.vecPop.sort(Genome.sort);
    this.medianFitness = this.vecPop[Math.floor(this.vecPop.length/2)].dFitness;
    for (let i=0; i<this.vecPop.length; i++){
      //update fittest if necessary
      if (this.vecPop[i].dFitness > highestSoFar){
        highestSoFar = this.vecPop[i].dFitness;
        this.iFittestGenome = i;
        this.dBestFitness	 = highestSoFar;
      }
      //update worst if necessary
      if (this.vecPop[i].dFitness < lowestSoFar){
        lowestSoFar = this.vecPop[i].dFitness;
        this.dWorstFitness = lowestSoFar;
      }
      this.dTotalFitness	+= this.vecPop[i].dFitness;
    }//next chromo
    this.dAverageFitness = this.dTotalFitness / this.iPopSize;
  }

  //-------------------------reset()------------------------------
  //
  //	resets all the relevant variables ready for a new generation
  //--------------------------------------------------------------
  reset() {
    this.dTotalFitness = 0;
    this.dBestFitness = 0;
    this.dWorstFitness = 9999999;
    this.dAverageFitness = 0;
    this.medianFitness = 0;
  }

  //accessor methods
  getChromos() {return this.vecPop;}
  getGeneration() {return this.cGeneration;}
  averageFitness() {return this.dTotalFitness / this.iPopSize;}
  bestFitness() {return this.dBestFitness;}
  getMedianFitness() {return this.medianFitness;}
}

export default GeneticAlgorithm;
