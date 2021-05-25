import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ShortenUrlForm from './components/ShortenUrlForm';

test('it should render App', () => {
    render(<App />);
    const punchline = screen.getByText(/The power of the link./i);
    expect(punchline).toBeInTheDocument();
});

test('it should allow changing the input value', () => {
    const inputWrapper = () => {
        const wrapper = render(<ShortenUrlForm />);
        const input = wrapper.getByLabelText('input');
        return {
            input,
            ...wrapper,
        };
    };
    const { input } = inputWrapper();
    fireEvent.change(input, { target: { value: 'https://www.abc.com/' } });
    expect(input.value).toBe('https://www.abc.com/');
});

test('it should show the form button with correct text', () => {
    const wrapper = render(<ShortenUrlForm />);
    const button = wrapper.getByLabelText('button');
    expect(button.value).toBe('Shorten and copy URL');
});
