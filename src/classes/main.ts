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
    private controller: Controller;
    private done: boolean = false;
    private paused: boolean = false;
    
    
    private static instance: Main;
    timer: any;
    static getInstance(): Main {
        if (!Main.instance) {
            Main.instance = new Main();
        }
        return Main.instance;
    }
    
    // emulate C++'s message system because it's definitely differnt from JS so why not
    public static messageProcesser(): void {
        switch (cppMessageSystem.popMessage()) {
            case "pause":
                Main.getInstance().pause();
                break;
            case "start":
                Main.getInstance().controller = new Controller(Main.getInstance().pause, Main.getInstance().unPause);   
                break;
            case "paint":
                Main.getInstance().controller.render();
                // confirm("paint");
                // throw new Error("paint");
                break;
            case "quit":
                Main.getInstance().done = true;
                break;
            default:
                break;
        }
    }

    pause(): void {
        this.paused = true; 
        confirm("pause");
        // cppMessageSystem.pushMessage("pause");
        // throw new Error("Method not implemented.");
    }
    unPause(): void {

        this.paused = false;
        this.loop();
    }

    private loop = () => {
        while(cppMessageSystem.peekMessage() !== ""){ 
            Main.messageProcesser();
        }
        if(this.timer.readyForNextFrame()){
            if(!this.controller.update()){
                console.error('Error in controller update');
                this.done = true;
            }
            cppMessageSystem.pushMessage("paint");
        }
        if(this.done) cppMessageSystem.pushMessage("quit");
        if(!this.paused) setTimeout(this.loop, 0);
    }

    constructor(){
        this.paused = false;
        this.done = false;
        this.timer = new Timer(iFramesPerSecond);
        this.controller= new Controller(this.pause, this.unPause);
        setTimeout(this.loop, 0);    
    }
}

export default Main;