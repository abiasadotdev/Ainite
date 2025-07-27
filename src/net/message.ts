import { ME } from "../node/config";

class message {
  from: string;
  event: string;
  data: any;
  timestamp: number;

  constructor(event: string, data: object) {
    this.from = ME.host + ":" + ME.port;
    this.event = event;
    this.data = data;
    this.timestamp = Date.now();
  }
}

export default message;
