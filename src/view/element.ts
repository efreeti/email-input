export interface ElementCreationOptions {
	name: string;
	classes?: Array<string>;
	role?: string;
	text?: string;
	children?: Array<HTMLElement>;
	listeners?: {
		[key in keyof HTMLElementEventMap]?: (this: HTMLElement, event: HTMLElementEventMap[key]) => any
	}
}

export function element(ownerDocument: Document, options: ElementCreationOptions) {
	const element = ownerDocument.createElement(options.name);
	element.className = options.classes ? options.classes.join(' ') : '';
	element.textContent = options.text || '';

	if (options.role) {
		element.setAttribute('role', options.role);
	}

	if (options.children) {
		options.children.forEach(child => element.appendChild(child));
	}

	if (options.listeners) {
		for (const listenerName in options.listeners) {
			element.addEventListener(listenerName, options.listeners[listenerName]);
		}
	}

	return element;
}
