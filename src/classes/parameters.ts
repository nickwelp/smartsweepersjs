class Parameters {
    /* General parameters */
    // static windowWidth = 600;
    // static windowHeight = 450;

    static windowWidth = 400;
    static windowHeight = 400;
    static framesPerSecond = 120;

    /* Used for the neural network */
    static numInputs = 4;
    static numHidden = 1;  
    static neuronsPerHiddenLayer = 6; //6
    static numOutputs = 2;
    /* for tweeking the sigmoid function */
    static activationResponse = 1;//1
    /* Bias value */
    static bias = -1;
    /* limits how fast the sweepers can turn */
    static maxTurnRate = 0.3;
    static maxSpeed = 2;
    /* for controlling the size */
    static sweeperScale = 5;
    /* controller parameters */
    static numMines = 40; //40
    static numSweepers = 30;//30; // 30; // 30;
    /* number of time steps we allow for each generation to live */
    static numTicks = 2000;// 2000;
    /* scaling factor for mines */
    static mineScale = 2;
    /* Genetic Algorithim parameters */
    static crossoverRate = 0.7; // 0.7 // 1  is no corss over, 0 evety time
    static mutationRate = 0.05; // 0.1
    /* the maximum amount the ga may mutate each weight by */
    static maxPerturbation = 0.3; //0.3
    /* used for elitism */
    static numElite = 4; //4
    static numCopiesElite = 1; //1
}

export default Parameters;