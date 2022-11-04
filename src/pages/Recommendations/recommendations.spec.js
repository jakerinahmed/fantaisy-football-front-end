import { default as Recommendations } from '.';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';





describe('Recommendations', () => {
    beforeEach(() => {
        render(<Recommendations />, { wrapper: MemoryRouter })
    });
    
    // test('it renders the user instructions', () => {
        
    //     const instruction = screen.getByRole('instruction')
    //     expect(instruction.textContent).toContain("To view your team please enter your email and password for your fantasy premier league team");
    // });
    test('there are two user text inputs', () => {
        
      
        const inputs = screen.getAllByRole('textbox')
        expect(inputs.length).toBe(2);
    });
    test('there is a Signup and login button', () => {
        const submit = screen.getAllByRole('button')
        expect(submit[0].textContent).toBe("Sign up")
        expect(submit[1].textContent).toBe("Login")
        expect(submit[2].value).toBe("Submit")
    });
    // test('the view analysis button takes you to /recommendations', () => {

    //     const button = screen.getByText('View analysis')
    //     expect(button.href).toContain("/recommendations");
    // });
    



});




