import React, { useState } from 'react';

const FarmForm = () => {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [protocol, setProtocol] = useState('');
    const [otherParams, setOtherParams] = useState('');

    const validateForm = () => {
        if (!investmentAmount) {
            alert('The investment amount cannot be empty. Please enter a valid number.');
            return false;
        }

        if (isNaN(investmentAmount)) {
            alert('The investment amount must be a number. Please correct your input.');
            return false;
        }

        if (investmentAmount <= 0) {
            alert("The investment amount must be greater than zero. Please enter a valid amount.");
            return false;
        }

        if (!protocol) {
            alert('Please select a protocol from the dropdown menu.');
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const formData = {
                investmentAmount,
                protocol,
                otherParams,
            };

            console.log('Submitting form data:', formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Investment Amount:</label>
            <input
              type="text"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Protocol:</label>
            <select value={protocol} onChange={(e) => setProtocol(e.target.value)}>
              <option value="">Select a Protocol</option>
              <option value="protocol1">Protocol 1</option>
              <option value="protocol2">Protocol 2</option>
            </select>
          </div>
          <div>
            <label>Other Parameters:</label>
            <input
              type="text"
              value={otherParams}
              onChange={(e) => setOtherParams(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
    );
};

export default FarmForm;