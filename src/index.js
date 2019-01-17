import './style.css'
import * as types from './Const/const'
import  'babel-polyfill';
import  fastclick from  'fastclick'
fastclick.attach(document.body)
class Shake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.num = 0;
        this.isprint = false;
        this.last_update = 0;
        this.init();
    }
    init() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', this.deviceMotionHandler, false);
        } else {
            alert('not support mobile event');
        }
    }
    deviceMotionHandler($event) {
        let acceleration = $event.accelerationIncludingGravity;
        let curTime = new Date().getTime();
        if ((curTime - this.last_update) > 100) {
            let diffTime = curTime - this.last_update;
            this.last_update = curTime;
            this.x = acceleration.x;
            this.y = acceleration.y;
            this.z = acceleration.z;
            let speed = Math.abs(this.x + this.y + this.z - this.last_x - this.last_y - this.last_z) / diffTime * 10000;
            let x1 = Math.abs(this.x - this.last_x);
            let y1 = Math.abs(this.y - this.last_y);
            let z1 = Math.abs(this.z - this.last_z);
            let max = 0;
            if (x1 > y1) {
                if (x1 > z1) {
                    max = x1;
                } else {
                    max = z1;
                }
            } else {
                if (y1 > z1) {
                    max = y1;
                } else {
                    max = z1;
                }
            }
            if (max > 40) {
                this.isprint = true;
                num++;
            } else if (max < 5 && this.isprint) {
                let node = document.getElementById("ulid");
                let li = document.createElement("li");
                li.innerText = num;
                node.appendChild(li);
                this.num = 0;
                this.isprint = false;
            }
            this.last_x = this.x;
            this.last_y = this.y;
            this.last_z = this.z;
        }
    }
    add() {
        this.num++;
        let node = document.getElementById("ulid");
        let li = document.createElement("li");
        li.innerText = num;
        node.appendChild(li);
    }
}
new  Shake()
