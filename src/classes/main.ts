import Timer from "./timer";
import Controller from "./controller";
import Parameters from "./parameters";

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
    private static paused: boolean = false;

    private callStack: number = 0;
    
    
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
            case "unpause":
                Main.getInstance().unPause();
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

 

    private loop = () => {
        // if(Main.paused) return;
        while(cppMessageSystem.peekMessage() !== ""){ 
            Main.messageProcesser();
        }
        if(this.timer.readyForNextFrame() || this.controller.getFastRender()){
            if(!this.controller.update()){
                console.error('Error in controller update');
                this.done = true;
            }
            cppMessageSystem.pushMessage("paint");
        }
        if(this.done) cppMessageSystem.pushMessage("quit");
        if(!Main.paused) {
            // this.running = true;
            // setTimeout(this.loop, 0);
            // setInterval(this.loop, 0);
            this.callStack++;
            if(this.callStack < 2000){
                Main.getInstance().loop();
            } else {
                this.callStack = 0;
                setTimeout(() => Main.getInstance().loop(), 0);
            }
        }
    }

    pause(): void {
        Main.paused = true; 
        // confirm("pause")
        // cppMessageSystem.pushMessage("pause");
        // throw new Error("Method not implemented.");
    }
    unPause(): void {
        console.log("unpausing");
        Main.paused = false;
        // this.loop();
        // cppMessageSystem.pushMessage("unpause");
        Main.getInstance().loop();
        // setTimeout(t his.loop, 0);
        // this.loop();
        // setTimeout(this.loop, 0); 
    }

    constructor(){
        Main.paused = false;
        this.done = false;
        this.timer = new Timer(Parameters.framesPerSecond);
        this.controller= new Controller(this.pause, this.unPause);
        setTimeout(this.loop, 0);  
        // this.loop();  
    }
}

export default Main;