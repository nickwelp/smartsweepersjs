class Genome {
  vecWeights: number[] = [];
  dFitness: number = 0;
  constructor() {
    if(arguments.length === 1) {
      // dFitness alone.. the C++ version of this algorithm uses 
      // method overrides on the constructor
      // this arguments sniffing emulates that
      this.dFitness = arguments[0];
    } else if (arguments.length === 2){
      this.vecWeights = arguments[0];
      this.dFitness = arguments[1];
    }
  }
  static lessThan(a:Genome, b:Genome){
    return (a.dFitness < b.dFitness);
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

  constructor(popsize: number, MutRat: number, CrossRat: number, numweights: number){
    this.iPopSize = popsize;
    this.dMutationRate = MutRat;
    this.dCrossoverRate = CrossRat;
    this.iChromoLength = numweights;
    this.dTotalFitness = 0;
    this.cGeneration = 0;
    this.iFittestGenome = 0;
    this.dBestFitness = 0;
    this.dWorstFitness = 99999999;
    this.dAverageFitness = 0;
    //initialise population with chromosomes consisting of random
	  //weights and all fitnesses set to zero
    for (let i=0; i<this.iPopSize; i++) {
      this.vecPop.push(new Genome());
      for (let j=0; j<this.iChromoLength; j++){
        this.vecPop[i].vecWeights.push(Math.random());
      }
    }
  }

  //---------------------------------Mutate--------------------------------
//
//	mutates a chromosome by perturbing its weights by an amount not 
//	greater than dMaxPerturbation
//-----------------------------------------------------------------------
static mutate(chromo: number[]) {
	// traverse the chromosome and mutate each weight dependent
	// on the mutation rate
	for (let i=0; i<chromo.length; i++) {
		// do we perturb this weight?
		if (Math.random() < this.dMutationRate){
			// add or subtract a small value to the weight
			chromo[i] += (RandomClamped() * CParams::dMaxPerturbation);
		}
	}
}


}

export default GeneticAlgorithm;
