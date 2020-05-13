import {ViewDocument} from '@/view/ViewDocument';

describe('ViewDocument', () => {
	describe('ViewDocument::createElement', () => {
		it('should create right element with classes', () => {
			const result = new ViewDocument(document).createElement({
				name: 'div',
				classes: ['class-1', 'class-2']
			});

			expect(result.localName).toBe('div');
			expect(result.className).toBe('class-1 class-2');
		});

		it('should create right element with text', () => {
			const result = new ViewDocument(document).createElement({
				name: 'div',
				text: 'some text'
			});

			expect(result.localName).toBe('div');
			expect(result.textContent).toBe('some text');
		});

		it('should create right element with children', () => {
			const viewDocument = new ViewDocument(document);

			const result = viewDocument.createElement({
				name: 'div',
				children: [
					viewDocument.createElement({
						name: 'span',
						classes: ['child-1']
					}),
					viewDocument.createElement({
						name: 'span',
						classes: ['child-2']
					}),
				]
			});

			expect(result.localName).toBe('div');
			expect(result.children.item(0).localName).toBe('span');
			expect(result.children.item(0).className).toBe('child-1');
			expect(result.children.item(1).localName).toBe('span');
			expect(result.children.item(1).className).toBe('child-2');
		});

		it('should create right element with event listeners', () => {
			const mockedClickListener = jest.fn();
			const result = new ViewDocument(document).createElement({
				name: 'div',
				listeners: {
					click: mockedClickListener
				}
			});

			result.dispatchEvent(new MouseEvent('click'));

			expect(result.localName).toBe('div');
			expect(mockedClickListener).toHaveBeenCalledTimes(1);
		});
	});
});
