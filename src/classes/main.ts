import Timer from "./timer";
import { iFramesPerSecond } from "../config";
import { dMaxPerturbation, iNumCopiesElite, iNumElite } from "../config";

export class Main {
    // emulate C++'s message system because it's definitely differnt from JS so why not
    private windowMessageQueue: string[] = [];

    private done: boolean = false;
    constructor(){
        const timer = new Timer(iFramesPerSecond);
        timer.start();
        while(!this.done){
            if(timer.readyForNextFrame()){
                this.update();
            }
        }
    }

}