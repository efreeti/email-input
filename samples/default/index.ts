import {EmailsInput} from '../../src';
import './index.scss';

const emailsCountLabel = document.getElementById('emails-count');
emailsCountLabel.textContent = '2';

const emailsInput = new EmailsInput(document.getElementById('email-input'), {
	emails: ['bla@bla.com', 'invalid.com'],
	onChange(emails) {
		emailsCountLabel.textContent = String(emails.length);
	}
})
	.create();

const sampleNames = ['bob', 'rob', 'john', 'steve', 'jane', 'anna'];
const sampleSubdomains = ['apple', 'facebook', 'google', 'linkedin'];
const sampleRootDomains = ['com', 'org', 'net', 'nl', 'ru', 'ua'];

function pickRandom(list: Array<string>) {
  return list[Math.round(Math.random() * (list.length - 1))];
}

document.getElementById('add-email').addEventListener('click', () => {
  emailsInput.addEmail(
		`${pickRandom(sampleNames)}@${pickRandom(sampleSubdomains)}.${pickRandom(sampleRootDomains)}`
	);
  emailsInput.scrollToBottom();
});
document.getElementById('get-emails-count').addEventListener('click', () => {
  alert(`${emailsInput.getEmails().length} emails entered!`);
});
