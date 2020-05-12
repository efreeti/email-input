export interface ElementCreationOptions<K extends keyof HTMLElementTagNameMap> {
	name: K;
	classes?: string[];
	role?: string;
	text?: string;
	children?: HTMLElement[];
	listeners?: {
		[key in keyof HTMLElementEventMap]?: (this: HTMLElement, event: HTMLElementEventMap[key]) => any
	}
}

export function element<K extends keyof HTMLElementTagNameMap>(ownerDocument: Document, options: ElementCreationOptions<K>) {
	const result = ownerDocument.createElement(options.name);
	result.className = options.classes ? options.classes.join(' ') : '';
	result.textContent = options.text || '';

	if (options.role) {
		result.setAttribute('role', options.role);
	}

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
