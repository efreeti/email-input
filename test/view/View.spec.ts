import {View} from '../../src/view/View';
import {Observable} from '../../src/model/Observable';

class TestModel extends Observable {
	constructor(private value: string) {
		super();
	}

	getValue() {
		return this.value;
	}

	setValue(value: string) {
		this.value = value;
		this.notifyObservers('value');
	}
}

class TestView extends View<TestModel> {
	constructor(ownerDocument: Document, model: TestModel) {
		super(ownerDocument, model);
	}

	protected createHtml(): HTMLElement {
		return this.element({
			name: 'div',
			classes: ['class-1']
		});
	}

	update(property: string) {
		if (property === 'value' || property === '*') {
			this.getHtml().textContent = this.getModel().getValue();
		}

		super.update(property);
	}
}

describe('View', () => {
	describe('View::create', () => {
		it('should create view properly', () => {
			const view = new TestView(document, new TestModel('value 1')).create();

			expect(view.html.localName).toBe('div');
			expect(view.html.textContent).toBe('value 1');
		});
	});

	describe('View::update', () => {
		it('should update view properly', () => {
			const model = new TestModel('value 1');
			const view = new TestView(document, model).create();

			model.setValue('value 2');

			expect(view.html.localName).toBe('div');
			expect(view.html.textContent).toBe('value 2');
		});
	});
});
