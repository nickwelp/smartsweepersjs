class Neuron {
  numInputs:number;
  vecWeight:number[] = [];


  constructor(numInputs:number) {
    //we need an additional weight for the bias hence the +1
    this.numInputs = numInputs;
    for (let i=0; i<numInputs+1; ++i){
      this.vecWeight.push(Math.random());
    }
  }

}

export default Neuron;

