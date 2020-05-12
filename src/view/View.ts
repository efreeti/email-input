import {Observable} from "../model/Observable";
import {Observer} from "../model/Observer";
import {element, ElementCreationOptions} from "./element";

export abstract class View<T extends Observable> implements Observer {
	public html: HTMLElement;

	protected constructor(private ownerDocument: Document, private model: T) {

	}

	element(options: ElementCreationOptions) {
		return element(this.ownerDocument, options);
	}

	getModel() {
		return this.model;
	}

	getHtml() {
		return this.html;
	}

	protected abstract createHtml(): HTMLElement;

	create() {
		this.model.addObserver(this);
		this.html = this.createHtml();
		this.update('*');

		return this;
	}

	update(property: string) {
	}
}
