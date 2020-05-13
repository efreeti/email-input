import {Observable} from '@/model/Observable';
import {Observer} from '@/model/Observer';
import {ViewDocument, ElementCreationOptions} from "@/view/ViewDocument";

export abstract class View<T extends Observable> implements Observer {
	public html: HTMLElement;

	protected constructor(private ownerDocument: ViewDocument, private model: T) {}

	getModel() {
		return this.model;
	}

	getOwnerDocument() {
		return this.ownerDocument;
	}

	getHtml() {
		return this.html;
	}

	extractDataTransferData(dataTransfer: DataTransfer) {
		try {
			return dataTransfer.getData('Text') || dataTransfer.getData('text/plain');
		} catch (error) {
			// IE can throw exception for 'text/plain' according to stack overflow
			return '';
		}
	}

	extractClipboardText(event: ClipboardEvent) {
		return this.extractDataTransferData(event.clipboardData || this.ownerDocument.getClipBoardData());
	}

	extractDroppedText(event: DragEvent) {
		return this.extractDataTransferData(event.dataTransfer);
	}

	createElement<K extends keyof HTMLElementTagNameMap>(options: ElementCreationOptions<K>) {
		return this.ownerDocument.createElement(options);
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
