/**
 * RESPONSIBILITY: DOM events and result rendering.
 * EXTENSION POINT: Replace static display with Chart.js visualization.
 */
export default class CalculatorUI {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.form = document.getElementById('my-form');
        this.initEvents();
    }

    initEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.clearErrors();
            if (this.validate()) {
                console.log('CalculatorUI: Valid inputs received');
                this.callbacks.onCalculate(this.getInputs());
            }
        });

        // Clear all button
        document.querySelector('.clear-all-btn')?.addEventListener('click', () => {
            this.form.reset();
            this.callbacks.onClear();
        });
    }

    getInputs() {
        return {
            amount: parseFloat(document.getElementById('mortgage-amount').value),
            term: parseFloat(document.getElementById('mortgage-term').value),
            rate: parseFloat(document.getElementById('interest-rate').value),
            type: document.querySelector('input[name="mortgage-type"]:checked').value
        };
    }

    renderResults(data, formatter) {
        console.log('Rendering results:', data);
        const emptyState = document.querySelector('.empty-state');
        const resultsState = document.querySelector('.results-state');
        
        emptyState.classList.add('hidden');
        resultsState.classList.remove('hidden');

        document.getElementById('monthly-result').innerText = formatter(data.monthlyPayment);
        document.getElementById('total-repay-result').innerText = formatter(data.totalRepayment);
        document.getElementById('total-interest-result').innerText = formatter(data.totalInterest);
    }

    validate() { /* Add validation logic similar to your script.js */ return true; }
    clearErrors() { /* Remove error highlights */ }
}