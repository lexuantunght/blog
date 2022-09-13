import ModuleContainer from 'common/shared/module-container';
import { EventEmitter } from 'events';

@ModuleContainer.singleton()
class Emitter {
    private eventEmitter;
    constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public addEventListener(eventName: string | symbol, listener: (...args: any[]) => void) {
        return this.eventEmitter.addListener(eventName, listener);
    }

    public emit(eventName: string | symbol, ...args: any[]) {
        return this.eventEmitter.emit(eventName, args);
    }

    public removeEventListener(eventName: string | symbol, listener: (...args: any[]) => void) {
        return this.eventEmitter.removeListener(eventName, listener);
    }
}

export default Emitter;
