import NeuronLayer from "./neuronLayer";
import { dActivationResponse, dBias, iNeuronsPerHiddenLayer, iNumHidden, iNumInputs, iNumOutputs } from "../config";

class NeuralNet {
  private numInputs: number;
  private numOutputs: number;
  private numHiddenLayers: number;
  private neuronsPerHiddenLayer: number;
  private neuronLayers: NeuronLayer[] = [];

  constructor(){
    this.numInputs = iNumInputs;
    this.numOutputs = iNumOutputs;
    this.numHiddenLayers = iNumHidden;
    this.neuronsPerHiddenLayer = iNeuronsPerHiddenLayer;
  }


  createNet(){
    //create the layers of the network
    if (this.numHiddenLayers > 0){
      //create first hidden layer
      this.neuronLayers.push(new NeuronLayer(this.neuronsPerHiddenLayer, this.numInputs));
      for (let i=0; i<this.numHiddenLayers; i++){
        this.neuronLayers.push(new NeuronLayer(this.neuronsPerHiddenLayer, this.neuronsPerHiddenLayer));
      }
      //create output layer
      this.neuronLayers.push(new NeuronLayer(this.numOutputs, this.neuronsPerHiddenLayer));
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
      for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
        //for each weight
        for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
          weights++;
        }
      }
    }
    return weights;
  }

  //	returns an array containing the weights
  getWeights(){
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
    return weights;
  }
  putWeights(weights:number[]){
    let cWeight = 0;	
    //for each layer
    for (let i=0; i<this.numHiddenLayers; i++){
      //for each neuron
      for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
        //for each weight
        for (let k=0; k<this.neuronLayers[i].vecNeurons[j].numInputs; k++){
          this.neuronLayers[i].vecNeurons[j].vecWeight[k] = weights[cWeight++];
        }
      }
    }
    return;
  }
  update(inputs:number[]):number[]{
    // stores the resultant outputs from each layer
    let outputs:number[] = [];
    let cWeight = 0;
    // first check that we have the correct amount of inputs
    if (inputs.length !== this.numInputs){
      // just return an empty vector if incorrect.
      return outputs;
    }
    // For each layer....
    for (let i=0; i<this.numHiddenLayers; i++){
      if ( i > 0 ){
        inputs = outputs;
      }
      outputs.length = 0;
      cWeight = 0;
      // for each neuron sum the (inputs * corresponding weights).
      // Throw the total at our sigmoid function to get the output.

      for (let j=0; j<this.neuronLayers[i].numNeurons; j++){
        let netinput = 0;
        this.numInputs = this.neuronLayers[i].vecNeurons[j].numInputs;
        for (let k=0; k<this.numInputs; k++){
          // sum the weights x inputs
          netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[k] * inputs[cWeight++];
        }
        // add in the bias
        netinput += this.neuronLayers[i].vecNeurons[j].vecWeight[this.numInputs-1] * dBias;
        // we can store the outputs from each layer as we generate them.
        // The combined activation is first filtered through the sigmoid
        // function
        outputs.push(this.sigmoid(netinput, dActivationResponse));
        cWeight = 0;
      }
    }
    return outputs;
  }
  sigmoid(netinput: number, response:number):number {
    return ( 1 / ( 1 + Math.exp(-1 * netinput / response)));
  }
}

 export default NeuralNet;
