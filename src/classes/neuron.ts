import randomFloat from "../utils/random";

class Neuron {
  numInputs:number;
  public vecWeight:number[] = [];


  constructor(numInputs:number) {
    //we need an additional weight for the bias hence the +1
    this.numInputs = numInputs;
    for (let i=0; i<numInputs+1; ++i){
      this.vecWeight.push(randomFloat());
      // this.vecWeight.push(0.9990001);
    }
  }

}

export default Neuron;

