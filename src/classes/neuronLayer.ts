import Neuron from './neuron';

class NeuronLayer {
  //the number of neurons in this layer
  numNeurons: number;
  numInputsPerNeuron: number;
  //the layer of neurons
  vecNeurons: Neuron[] = [];

  constructor(numNeurons:number, numInputsPerNeuron: number){
    this.numNeurons = numNeurons;
    this.numInputsPerNeuron = numInputsPerNeuron;
    for(let i = 0; i<numNeurons; i++){
      this.vecNeurons.push(new Neuron(this.numInputsPerNeuron));
    }
  }
};

export default NeuronLayer;