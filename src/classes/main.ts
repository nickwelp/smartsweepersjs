import Timer from "./timer";
import Controller from "./controller";
import { iFramesPerSecond } from "../config";

class cppMessageSystem {
    private static instance: cppMessageSystem;
    private constructor() { }
    public static getInstance(): cppMessageSystem {
        if (!cppMessageSystem.instance) {
            cppMessageSystem.instance = new cppMessageSystem();
        }
        return cppMessageSystem.instance;
    }
    private static messageQueue: string[] = [];
    public static pushMessage(message: string): void {
        cppMessageSystem.messageQueue.push(message);
    }
    public static popMessage(): string {
        if(cppMessageSystem.messageQueue.length>0) return cppMessageSystem.messageQueue.pop() || "";
        return "";
    }
    public static peekMessage(): string {
        if(cppMessageSystem.messageQueue.length>0) return cppMessageSystem.messageQueue[cppMessageSystem.messageQueue.length-1];
        return "";
    }
    
}
// window.requestAnimationFrame(step);

export class Main {
    private controller: Controller = new Controller();
    private done: boolean = false;
    
    private static instance: Main;
    static getInstance(): Main {
        if (!Main.instance) {
            Main.instance = new Main();
        }
        return Main.instance;
    }
    
    // emulate C++'s message system because it's definitely differnt from JS so why not
    public static messageProcesser(): void {
        switch (cppMessageSystem.popMessage()) {
            case "start":
                Main.getInstance().controller = new Controller();   
                break;
            case "paint":
                console.log("paint");
                Main.getInstance().controller.render();
                break;
            case "quit":
                Main.getInstance().done = true;
                break;
            default:
                break;
        }
    }

    constructor(){
        const timer = new Timer(iFramesPerSecond);
        timer.start();
        const loop = () => { 
            console.log("loop calling");
            while(cppMessageSystem.peekMessage() !== ""){ 
                Main.messageProcesser();
            }
            if(timer.readyForNextFrame()){
                if(!this.controller.update()){
                    console.error('Error in controller update');
                    this.done = true;
                }
                cppMessageSystem.pushMessage("paint");
            }
            if(this.done) cppMessageSystem.pushMessage("quit");
            setTimeout(loop, 0);
        }
        setTimeout(loop, 0);    
    }
}

export default Main;