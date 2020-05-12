import {element} from '@/view/element';

describe('element', () => {
	it('should create right element with text', () => {
		const result = element(document, {
			name: 'div',
			classes: ['class-1', 'class-2'],
			role: 'role1',
			text: 'some text'
		});

		expect(result.localName).toBe('div');
		expect(result.className).toBe('class-1 class-2');
		expect(result.getAttribute('role')).toBe('role1');
		expect(result.textContent).toBe('some text');
	});

	it('should create right element with children', () => {
		const result = element(document, {
			name: 'div',
			classes: ['class-1', 'class-2'],
			role: 'role1',
			children: [
				element(document, {
					name: 'span',
					classes: ['child-1']
				}),
				element(document, {
					name: 'span',
					classes: ['child-2']
				}),
			]
		});

		expect(result.localName).toBe('div');
		expect(result.className).toBe('class-1 class-2');
		expect(result.getAttribute('role')).toBe('role1');
		expect(result.children.item(0).localName).toBe('span');
		expect(result.children.item(0).className).toBe('child-1');
		expect(result.children.item(1).localName).toBe('span');
		expect(result.children.item(1).className).toBe('child-2');
	});

	it('should create right element with event listeners', () => {
		const events = [];
		const result = element(document, {
			name: 'div',
			classes: ['class-1', 'class-2'],
			role: 'role1',
			listeners: {
				click: event => events.push(event)
			}
		});

		result.dispatchEvent(new MouseEvent('click'));

		expect(result.localName).toBe('div');
		expect(result.className).toBe('class-1 class-2');
		expect(result.getAttribute('role')).toBe('role1');
		expect(events.length).toBe(1);
		expect(events[0].type).toBe('click');
	});
});
