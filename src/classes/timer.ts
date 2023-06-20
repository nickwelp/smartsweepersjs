import Parameters from "./parameters";

class Timer {
    private currentTime: number;
    private lastTime: number;
    private nextTime: number;
    private frameTime: number;
    private perfCountFreq: number;
    private timeElapsed: number;
    private fps: number;
    constructor(fps: number = Parameters.framesPerSecond){
        this.currentTime = 0;
        this.lastTime = 0;
        this.nextTime = 0;
        this.frameTime = 0;
        // this strategy is mostly a byproduct of being a port from C++
        this.perfCountFreq = 1000; //ms in a second 
        this.timeElapsed = 0;
        this.fps = 0;
        if(fps){
            this.fps = fps;
            this.frameTime = this.perfCountFreq / this.fps;
            this.lastTime = new Date().getTime();
            this.currentTime = this.lastTime;
            this.nextTime = this.currentTime + this.frameTime;

        }
    }

    public start(){
        this.nextTime = new Date().getTime() + this.frameTime;
    };

    public readyForNextFrame(): boolean {
        this.currentTime = new Date().getTime();
        if(this.currentTime > this.nextTime){
            this.timeElapsed = this.currentTime - this.lastTime;
            this.lastTime = this.currentTime;
            this.nextTime = this.currentTime + this.frameTime;
            return true;
        } else {
            return false;
        }
    }

    public getTimeElapsed(): number {
        this.currentTime = new Date().getTime();
        this.timeElapsed = this.currentTime - this.lastTime;
        this.lastTime = this.currentTime;
        return this.timeElapsed;
    }

}

export default Timer;