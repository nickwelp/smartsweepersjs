class Parameters {
    /* General parameters */
    static windowWidth = 800;
    static windowHeight = 600;
    static framesPerSecond = 60;

    /* Used for the neural network */
    static numInputs = 4;
    static numHidden = 1;  
    static neuronsPerHiddenLayer = 6;
    static numOutputs = 2;
    /* for tweeking the sigmoid function */
    static activationResponse = 1;
    /* Bias value */
    static bias = -1;
    /* limits how fast the sweepers can turn */
    static maxTurnRate = 0.3;
    static maxSpeed = 2;
    /* for controlling the size */
    static sweeperScale = 2;
    /* controller parameters */
    static numMines = 40;
    static numSweepers = 30;
    /* number of time steps we allow for each generation to live */
    static numTicks = 2000;
    /* scaling factor for mines */
    static mineScale = 2;
    /* Genetic Algorithim parameters */
    static crossoverRate = 0.7;
    static mutationRate = 0.1; // 0.1
    /* the maximum amount the ga may mutate each weight by */
    static maxPerturbation = 0.3;
    /* used for elitism */
    static numElite = 4;
    static numCopiesElite = 1;
    static useSquaredFitness = false;
}

export default Parameters;