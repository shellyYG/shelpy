import { render, fireEvent } from '@testing-library/react';
import FullLineTextBox from './FullLineTextBox';

// Unit test on box rendered correctly
it('FullLineTextBox Render Check', () => {
    const { queryByTitle } = render(<FullLineTextBox />);
    const input = queryByTitle('full-line-text-box');
    expect(input).toBeTruthy();
})

// Unit test on input value changed to be default value correctly
describe('change in FullLineTextBox input value', () => {
    it('change input value', () => {
        const { queryByTitle } = render(<FullLineTextBox />);
        const input = queryByTitle('full-line-text-box');
        fireEvent.change(input, { target: { value: 'randomDefaultValue' }});
        expect(input.value).toBe('randomDefaultValue');
    })
})