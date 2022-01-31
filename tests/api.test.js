import {beforeAll, afterEach, describe, test, it, expect} from '@jest/globals';
import Datepicker from 'datepicker';

let $input, $altInput, dp, $datepicker;

beforeAll(() => {
    $input = document.createElement('input');
    $altInput = document.createElement('input');
    document.body.appendChild($input);
    document.body.appendChild($altInput);
});

afterEach(() => {
    dp.destroy();
    dp = false;
    $datepicker = false;
});

function init(opts) {
    dp = new Datepicker($input, {visible: true, ...opts});
    $datepicker = dp.$datepicker;
}


describe('API TESTS', () => {
    describe('selectDate', () => {
        it('should select one passed date', () => {
            let selectedDate = new Date();
            init();

            dp.selectDate(selectedDate);

            expect(dp.selectedDates).toContain(selectedDate);
        });
    });

    describe('update', () => {
        test('minDate should be applied after init', () => {
            let minDate = new Date('2021-10-06');

            init({
                startDate: minDate
            });

            dp.update({
                minDate
            });

            expect(dp.getCell(minDate)).toHaveClass('-min-date-');
        });

        test('update existing buttons with new one', () => {
            expect(() => {
                init({
                    visible: false,
                    buttons: ['clear']
                });

                dp.update({
                    buttons: ['today']
                });
            }).not.toThrow();
        });

        test('update `view` when calendar is hidden', () => {
            init({
                visible: false
            });
            expect(() => {
                dp.update({
                    view: 'months'
                });
            }
            ).not.toThrow();
        });
    });
});
