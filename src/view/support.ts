export function detectInputScrollWidthSupport(ownerDocument: Document) {
	const input = ownerDocument.createElement('input');
	input.value = '0000000000000000000000000000';
	input.style.width = '1px';
	input.style.border = 'none';
	input.style.outline = 'none';

	document.body.appendChild(input);

	const supported = input.scrollWidth > input.offsetWidth;

	document.body.removeChild(input);

	return supported;
}
