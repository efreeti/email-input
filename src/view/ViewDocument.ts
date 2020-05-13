export interface ElementCreationOptions<K extends keyof HTMLElementTagNameMap> {
	name: K;
	classes?: string[];
	text?: string;
	children?: HTMLElement[];
	listeners?: {
		[key in keyof HTMLElementEventMap]?: (this: HTMLElement, event: HTMLElementEventMap[key]) => any
	}
}

export class ViewDocument {
	private inputScrollWidthSupported: boolean;

	constructor(private domDocument: Document) {}

	getClipBoardData() {
		return (this.domDocument.defaultView as any).clipboardData as DataTransfer;
	}

	isInputScrollWidthSupported() {
		if (this.inputScrollWidthSupported === undefined) {
			const input = this.createElement({name: 'input'});
			input.value = '0000000000000000000000000000';
			input.style.width = '1px';
			input.style.border = 'none';
			input.style.outline = 'none';

			this.domDocument.body.appendChild(input);

			this.inputScrollWidthSupported = input.scrollWidth > input.offsetWidth;

			this.domDocument.body.removeChild(input);
		}

		return this.inputScrollWidthSupported;
	}

	createElement<K extends keyof HTMLElementTagNameMap>(options: ElementCreationOptions<K>) {
		const result = this.domDocument.createElement(options.name);
		result.className = options.classes ? options.classes.join(' ') : '';
		result.textContent = options.text || '';

		if (options.children) {
			options.children.forEach(child => result.appendChild(child));
		}

		if (options.listeners) {
			for (const listenerName in options.listeners) {
				if (options.listeners.hasOwnProperty(listenerName)) {
					result.addEventListener(listenerName, options.listeners[listenerName]);
				}
			}
		}

		return result;
	}
}
