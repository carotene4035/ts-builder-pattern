interface Observer {
    update(value: string): void;
}

/** 観察されるdom */
class InputBox {

    element: HTMLInputElement;
    listeners: Array<Observer> = [];

    constructor(elementId: string) {
        this.element = <HTMLInputElement>document.getElementById(elementId);
        this.handleEvents();
    }

    handleEvents() {
        const self = this;
        this.element.addEventListener('keyup', function () {
            const value = self.element.value;
            /** 変更があった時、observerたちに通知する */
            self.listeners.forEach(function (listener: Observer, index, listeners: Array<Observer>) {
                listener.update(value);
            });
        });
    }

    addListeners(listeners: any) {
        this.listeners.push(listeners);
    }
}

class Ore implements Observer {
    update(value: string) {
        console.log(value);
    }
}

class Watashi implements Observer {
    update(value: string) {
        console.log(value);
    }
}


/** box idを持つdomに対して適用 */
const inputBox = new InputBox('box');

const ore = new Ore();
const watashi = new Watashi();

inputBox.addListeners(ore);
inputBox.addListeners(watashi);