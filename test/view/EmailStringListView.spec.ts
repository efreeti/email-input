import {ViewDocument} from '@/view/ViewDocument';
import {EmailString} from '@/model/EmailString';
import {EmailStringList} from '@/model/EmailStringList';
import {EmailStringListView} from '@/view/EmailStringListView';

const bohdan = new EmailString('bohdan@tsymbala.com');
const invalid = new EmailString('invalid.com');
const john = new EmailString('john@doe.com');
const jane = new EmailString('jane@doe.com');

describe('EmailStringListView', () => {
	describe('EmailStringListView::create', () => {
		it('it should create initial values properly', () => {
			const view = new EmailStringListView(new ViewDocument(document), new EmailStringList([bohdan, invalid])).create();

			const items = view.html.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(2);
			expect(items.item(0).className).toContain('-valid');
			expect(items.item(0).textContent).toContain('bohdan@tsymbala.com');
			expect(items.item(1).className).toContain('-invalid');
			expect(items.item(1).textContent).toContain('invalid.com');
		});
	});

	describe('EmailStringListView::update', () => {
		it('it should update values properly', () => {
			const emailStringList = new EmailStringList([bohdan, invalid]);
			const view = new EmailStringListView(new ViewDocument(document), emailStringList).create();

			emailStringList.addEmails([john, jane]);
			emailStringList.removeEmail(bohdan);

			const items = view.html.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(3);
			expect(items.item(0).className).toContain('-invalid');
			expect(items.item(0).textContent).toContain('invalid.com');
			expect(items.item(1).className).toContain('-valid');
			expect(items.item(1).textContent).toContain('john@doe.com');
			expect(items.item(2).className).toContain('-valid');
			expect(items.item(2).textContent).toContain('jane@doe.com');
		});
	});

	describe('EmailStringListView click to remove', () => {
		it('it should remove items properly', () => {
			const view = new EmailStringListView(new ViewDocument(document), new EmailStringList([bohdan, invalid, john])).create();

			let items = view.html.querySelectorAll('.email-string-list__email-block');
			items.item(0).querySelector('.email-string-list__email-remove-button').dispatchEvent(
				new MouseEvent('click')
			);

			items = view.html.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(2);
			expect(items.item(0).className).toContain('-invalid');
			expect(items.item(0).textContent).toContain('invalid.com');
			expect(items.item(1).className).toContain('-valid');
			expect(items.item(1).textContent).toContain('john@doe.com');
		});
	});
});
