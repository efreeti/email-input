import {EmailString} from "../../src/model/EmailString";
import {EmailStringList} from "../../src/model/EmailStringList";
import {EmailsInputView} from "../../src/view/EmailsInputView";

const bohdan = new EmailString('bohdan@tsymbala.com');
const invalid = new EmailString('invalid.com');
const john = new EmailString('john@doe.com');
const jane = new EmailString('jane@doe.com');

describe('EmailsInputView', () => {
	describe('EmailsInputView::create', () => {
		it('it should create initial markup properly', () => {
			const view = new EmailsInputView(document, new EmailStringList([bohdan, invalid])).create();

			expect(view.html.querySelector('.emails-input__control')).not.toBeNull();

			const items = view.html.querySelectorAll('.email-string-list__email-block');

			expect(items.length).toBe(2);
			expect(items.item(0).className).toContain('-valid');
			expect(items.item(0).textContent).toContain('bohdan@tsymbala.com');
			expect(items.item(1).className).toContain('-invalid');
			expect(items.item(1).textContent).toContain('invalid.com');
		});
	});

	describe('EmailsInputView::update', () => {
		it('it should update values properly', () => {
			const emailStringList = new EmailStringList([bohdan, invalid]);
			const view = new EmailsInputView(document, emailStringList).create();

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

	describe('EmailsInputView addition events', () => {
		it('it should add items on blur', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \njohn@doe.com \t';
			input.dispatchEvent(new Event('blur'));

			expect(input.value).toBe('');
			expect(emailStringList.getEmails().length).toBe(2);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
		});

		it('it should add items on pressing "Enter"', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \njohn@doe.com \t';
			input.dispatchEvent(new KeyboardEvent('keydown', {
				key: 'Enter'
			}));

			expect(input.value).toBe('');
			expect(emailStringList.getEmails().length).toBe(2);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
		});

		it('it should add items on typing "," at the end', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \n john@doe.com \t,';
			input.dispatchEvent(new KeyboardEvent('keyup', {
				key: ','
			}));

			expect(input.value).toBe('');
			expect(emailStringList.getEmails().length).toBe(2);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
		});

		it('it should add items on typing "," in the middle', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \t john@doe.com \n,\n\t jane@doe.com  ';
			input.dispatchEvent(new KeyboardEvent('keyup', {
				key: ','
			}));

			expect(input.value).toBe('jane@doe.com  ');
			expect(emailStringList.getEmails().length).toBe(2);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
		});

		it('it should add items on paste', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \t invalid.com  ';
			const event = new Event('paste');
			(<any> event).clipboardData = {
				getData: type => {
					if (type === 'text/plain') {
						return ' \t john@doe.com \n,\n\t jane@doe.com  ';
					} else {
						return null;
					}
				}
			};
			input.dispatchEvent(event);

			expect(input.value).toBe(' \t invalid.com  ');
			expect(emailStringList.getEmails().length).toBe(3);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
			expect(emailStringList.getEmails()[2].value).toBe('jane@doe.com');
		});

		it('it should add items on drop', () => {
			const emailStringList = new EmailStringList([bohdan]);
			const view = new EmailsInputView(document, emailStringList).create();

			let input = view.html.querySelector('input');
			input.value = ' \t invalid.com  ';
			const event = new Event('drop');
			(<any> event).dataTransfer = {
				getData: type => {
					if (type === 'text/plain') {
						return ' \t john@doe.com \n,\n\t jane@doe.com  ';
					} else {
						return null;
					}
				}
			};
			view.html.dispatchEvent(event);

			expect(input.value).toBe(' \t invalid.com  ');
			expect(emailStringList.getEmails().length).toBe(3);
			expect(emailStringList.getEmails()[0].value).toBe('bohdan@tsymbala.com');
			expect(emailStringList.getEmails()[1].value).toBe('john@doe.com');
			expect(emailStringList.getEmails()[2].value).toBe('jane@doe.com');
		});
	});
});
