/** this file exists to pipe random through a controllable function for testing */
let index = 0;


const randomFloat = () => {
    // return (0.005 + (index++ * 0.21 )) % 1;
    // const t = Math.random();
    // console.log(t);
    // return t;
    return Math.random();
}

const randomFloatSpaced = () => {
    // return 0.05 * index++;
    return randomFloat();
    // return Math.random();
};

export { randomFloatSpaced };

export default randomFloat;