import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act, mockComponent } from 'react-dom/test-utils';
import Modal from "./Modal";

const scheduleLabel = ['', 'Date', 'Everyday at', 'Every'];

const initForm = {
    working: false,
    message: null,
    name: '',
    formatR: 'xlsx',
    email: '',
    scheduleType: 0,
    scheduleDate: null,
    scheduleTime: null,
    scheduleDay: null
};

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: initForm.name,
        formatR: initForm.formatR,
        email: initForm.email,
        scheduleType: initForm.scheduleType,
        scheduleDate: null,
        scheduleTime: null,
        scheduleDay: null
    })
};

beforeEach(() => {
    render(<Modal />);
});

describe("Init values and render", () => {

    test('Are initial renders correct', () => {
        expect(screen.getByTestId ("modal-window"))
        .toBeInTheDocument();

        expect(screen.queryByTestId("message-div"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-inputs"))
        .not.toBeInTheDocument(); 
    });
    
    test('Are initial values correct', () => {
        expect(screen.getByTestId('name'))
        .toHaveTextContent(initForm.name);

        expect(screen.getByTestId('email'))
        .toHaveTextContent(initForm.email);

        expect(screen.getByTestId("formatR1").checked)
        .toBe(true);

        expect(screen.getByTestId("formatR2").checked)
        .toBe(false);

        expect(screen.getByTestId("type-zero").checked)
        .toBe(true);

        expect(screen.getByTestId("type-one").checked)
        .toBe(false);

        expect(screen.getByTestId("type-two").checked)
        .toBe(false);

        expect(screen.getByTestId("type-three").checked)
        .toBe(false);
    });
});

describe('Checking value changes', () => {
    test('Name value change', () => {
        const nameField = screen.getByTestId('name');
        userEvent.type(nameField, 'new test raport name');
        expect(nameField.value).toBe('new test raport name');
    });

    test('Email value change', () => {
        const emailField = screen.getByTestId('email');
        userEvent.type(emailField, 'test@test.com');
        expect(emailField.value).toBe('test@test.com');
    });

    test('FormatR value change', () => {
        const formatR1 = screen.getByTestId('formatR1');
        const formatR2 = screen.getByTestId('formatR2');

        userEvent.click(formatR2);

        expect(formatR2.checked).toBe(true);
        expect(formatR1.checked).toBe(false);

        userEvent.click(formatR1);

        expect(formatR2.checked).toBe(false);
        expect(formatR1.checked).toBe(true);
    });

    test('Schedule type change for type-one', () => {
        const typeZero = screen.getByTestId("type-zero");
        const typeOne = screen.getByTestId("type-one");
        const typeTwo = screen.getByTestId("type-two");
        const typeThree = screen.getByTestId("type-three");

        userEvent.click(typeOne);

        expect(typeZero.checked).toBe(false);
        expect(typeOne.checked).toBe(true);
        expect(typeTwo.checked).toBe(false);
        expect(typeThree.checked).toBe(false);

        const label = screen.getByTestId("schedule-label");
        expect(label).toHaveTextContent(scheduleLabel[1]);

        expect(screen.queryByTestId("schedule-inputs"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("date-input"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("time-input"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-span"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("day-input"))
        .not.toBeInTheDocument(); 
    });

    test('Schedule type change for type-two', () => {
        const typeZero = screen.getByTestId("type-zero");
        const typeOne = screen.getByTestId("type-one");
        const typeTwo = screen.getByTestId("type-two");
        const typeThree = screen.getByTestId("type-three");

        userEvent.click(typeTwo);

        expect(typeZero.checked).toBe(false);
        expect(typeOne.checked).toBe(false);
        expect(typeTwo.checked).toBe(true);
        expect(typeThree.checked).toBe(false);

        const label = screen.getByTestId("schedule-label");
        expect(label).toHaveTextContent(scheduleLabel[2]);

        expect(screen.queryByTestId("schedule-inputs"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("date-input"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("time-input"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-span"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("day-input"))
        .not.toBeInTheDocument(); 
    });

    test('Schedule type change for type-thre', () => {
        const typeZero = screen.getByTestId("type-zero");
        const typeOne = screen.getByTestId("type-one");
        const typeTwo = screen.getByTestId("type-two");
        const typeThree = screen.getByTestId("type-three");

        userEvent.click(typeThree);

        expect(typeZero.checked).toBe(false);
        expect(typeOne.checked).toBe(false);
        expect(typeTwo.checked).toBe(false);
        expect(typeThree.checked).toBe(true);

        const label = screen.getByTestId("schedule-label");
        expect(label).toHaveTextContent(scheduleLabel[3]);

        expect(screen.queryByTestId("schedule-inputs"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("date-input"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("time-input"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-span"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("day-input"))
        .toBeInTheDocument(); 
    });

    test('Schedule type change for type-zero', () => {
        const typeZero = screen.getByTestId("type-zero");
        const typeOne = screen.getByTestId("type-one");
        const typeTwo = screen.getByTestId("type-two");
        const typeThree = screen.getByTestId("type-three");

        const label = screen.queryByTestId("schedule-label");

        userEvent.click(typeZero);

        expect(typeZero.checked).toBe(true);
        expect(typeOne.checked).toBe(false);
        expect(typeTwo.checked).toBe(false);
        expect(typeThree.checked).toBe(false);

        expect(label).not.toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-inputs"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("date-input"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("time-input"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("schedule-span"))
        .not.toBeInTheDocument(); 

        expect(screen.queryByTestId("day-input"))
        .not.toBeInTheDocument(); 
    });
});

describe('Test of submit button', () => {
    test('Submit button test', () => {
        const submitBtn = screen.getByTestId("submit");
        
        userEvent.click(submitBtn);
        expect(submitBtn.disabled).toBe(true);

        expect(screen.queryByTestId("message-div"))
        .toBeInTheDocument(); 

        expect(screen.queryByTestId("message-div"))
        .toHaveTextContent('Sending mock raport, please wait');
    });
});

describe('Test post method', () => {
    test('Sending data raport', async () => {

        jest.spyOn(global, "fetch").mockImplementation(() =>  
        Promise.resolve({
            json: () => Promise.resolve({
                id: Number
            })
        }));

        userEvent.click(screen.getByTestId("submit"));

        expect(global.fetch).toBeCalled();
        expect(global.fetch).toBeCalledWith(
            'https://smarcinkowski.pw/drfapi/post', requestOptions
        );
    });
});