import NeuronLayer from "./neuronLayer";
import Parameters from "./parameters";
// import { dActivationResponse, dBias, iNeuronsPerHiddenLayer, iNumHidden, iNumInputs, iNumOutputs } from "./parameters";

class NeuralNet {
  private numInputs: number;
  private numOutputs: number;
  private numHiddenLayers: number;
  private neuronsPerHiddenLayer: number;
  private neuronLayers: NeuronLayer[] = [];
  private name:string;
  private incomingWeights: number[] = [];
  private outgoingWeights: number[] = [];
  private cycles: number = 0;

  constructor(name:string){
    this.name = name;
    this.numInputs = Parameters.numInputs;
    this.numOutputs = Parameters.numOutputs;
    this.numHiddenLayers = Parameters.numHidden;
    this.neuronsPerHiddenLayer = Parameters.neuronsPerHiddenLayer;
    this.createNet();
    // @ts-ignore
    window[`neuralNet_${name}`] = this;
  }


  createNet(){
    console.log('CREATING NET', this);
    //create the layers of the network
    if (this.numHiddenLayers > 0){
      //create first hidden layer
      this.neuronLayers.push(new NeuronLayer(this.neuronsPerHiddenLayer, this.numInputs));
      for (let i=0; i<this.numHiddenLayers-1; i++){
        this.neuronLayers.push(new NeuronLayer(this.neuronsPerHiddenLayer, this.neuronsPerHiddenLayer));
      }
      //create output layer
      this.neuronLayers.push(new NeuronLayer(this.numOutputs, this.numInputs));
    } else {
      //create output layer
      this.neuronLayers.push(new NeuronLayer(this.numOutputs, this.numInputs));
    }
  }

  //	returns the total number of weights needed for the net
  getNumberOfWeights():number{
    let weights = 0;
    //for each layer
    for (let i=0; i<this.numHiddenLayers; i++){
      //for each neuron
      // if(this.neuronLayers.length > 0){
        for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
          //for each weight
          for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
            weights++;
          }
        }
      // }
    }
    return weights;
  }

  //	returns an array containing the weights
  getWeights(){
    // return this.outgoingWeights;
    //this will hold the weights
    
	  const weights:number[] = [];
    //for each layer
    for (let i=0; i<this.numHiddenLayers; i++){
      //for each neuron
      for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
        //for each weight
        for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
          weights.push(this.neuronLayers[i].vecNeurons[j].vecWeight[k]);
        }
      }
    }
    // console.log(`${this.name} has weights: ${JSON.stringify(weights)}`);
    return weights;
  }
  putWeights(weights:number[]){
    // console.log(`putting weights on ${this.name}`);
    // this.incomingWeights = [...weights];
    // this.outgoingWeights = [...weights];
    // return;
    // this.getWeights();
    // console.log(`putting weights on ${this.name}\n${JSON.stringify(weights)}`);
    let cWeight = 0;	
    //for each layer
    for (let i=0; i<this.numHiddenLayers; i++){
      //for each neuron
      if(this.neuronLayers.length > 0){
        for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
          // this.neuronLayers[i].vecNeurons[j].vecWeight.length = 0;
          //for each weight
          for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
            // console.log(`layer ${i} neroun ${j} weight ${k} = cWeight index: ${cWeight} ${weights[cWeight]}`);
            this.neuronLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];

            // this.neuronLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];
          }
        }
      }
    }
    // this.getWeights();
    return;
  }
  update(inputArgs:number[]):number[]{
    if(this.incomingWeights.length > 0){
      // console.log(`putting weights on ${this.name}`);
      let cWeight = 0;	
      //for each layer
      for (let i=0; i<this.numHiddenLayers; i++){
        //for each neuron
        if(this.neuronLayers.length > 0){
          for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
            // this.neuronLayers[i].vecNeurons[j].vecWeight.length = 0;
            //for each weight
            for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
              // console.log(`layer ${i} neroun ${j} weight ${k} = cWeight index: ${cWeight} ${weights[cWeight]}`);
              this.neuronLayers[i].vecNeurons[j].vecWeight[k] = this.incomingWeights[cWeight++];

              // this.neuronLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];
            }
          }
        }
      }
      this.outgoingWeights = [...this.incomingWeights];
      this.incomingWeights.length = 0;
    }
  
    let inputs = [...inputArgs];
    // stores the resultant outputs from each layer
    let outputs:number[] = [];
    let cWeight = 0;
    // first check that we have the correct amount of inputs
    if (inputs.length !== this.numInputs){
      // just return an empty vector if incorrect.
      console.log(`Error wrong number of inputs, expected ${this.numInputs} got ${inputs.length}`);
      return outputs;
    }
    // For each layer.... (+1 for bias layer)
    for (let i=0; i<this.numHiddenLayers + 1; i++){
      if ( i > 0 ){
        inputs = [...outputs];
      }
      outputs.length = 0;
      cWeight = 0;
      // for each neuron sum the (inputs * corresponding weights).
      // Throw the total at our sigmoid function to get the output.
      if(this.neuronLayers.length > 0){
        for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
          let netinput = 0;
          this.numInputs = this.neuronLayers[i].vecNeurons[j].numInputs;
          // for (let k=0; k<this.numInputs-1; k++){
          
          for (let k=0; k<this.numInputs-1; k++){
            // sum the weights x inputs
            if(this.name === 'Sweeper_0' && k===0 && i===0 && j===0 && this.cycles%52===0) {

              console.log(`Sweeper_0 info:\n\tindex: ${cWeight}\n\tweight:${this.neuronLayers[i].vecNeurons[j].vecWeight[k]}\n\toutgoing weight ${this.outgoingWeights[0]}`);
            }
            netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[k] * inputs[cWeight++];
          }
          // add in the bias
          netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[this.numInputs-1] * Parameters.bias;
          // we can store the outputs from each layer as we generate them.
          // The combined activation is first filtered through the sigmoid
          // function
          outputs.push(this.sigmoid(netinput, Parameters.activationResponse));
          cWeight = 0;
        }
        if(this.name === 'Sweeper_0'){
          this.cycles++;
          if(this.cycles%100===0) {
            this.cycles = 0;
            // console.log(`Sweeper_0\n\tweights: ${this.neuronLayers[0].vecNeurons[0].vecWeight[0]}\n\t${JSON.stringify(inputs)}`);
          }
          // this.neuronLayers[i].vecNeurons[j].vecWeight[k] = 0.5;
        }   
      }
    }
    return outputs;
  }
  sigmoid(netinput: number, response:number):number {
    return ( 1 / ( 1 + Math.exp(-1 * netinput / response)));
  }
}
 export default NeuralNet;
