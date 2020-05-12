import {Observer} from "./Observer";

export class Observable {
	private observers: Array<Observer> = [];

	addObserver(observer: Observer) {
		this.observers.push(observer);
	}

	removeObserver(observer: Observer) {
		this.observers = this.observers.filter(item => item !== observer);
	}

	hasObserver(observer: Observer) {
		return this.observers.includes(observer);
	}

	notifyObservers(property: string) {
		this.observers.slice(0).forEach(observer => observer.update(property));
	}
}
