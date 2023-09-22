import React, { useState } from 'react';
import './InjectorFlowCalculator.css'; // Import your CSS file

const InjectorFlowCalculator = () => {
  const [targetHP, setTargetHP] = useState(0);
  const [cylinders, setCylinders] = useState(0);
  const [bsfc, setBsfc] = useState(0);
  const [dutyCycle, setDutyCycle] = useState(0);
  const [lbPerHourResult, setLbPerHourResult] = useState('');
  const [ccResult, setCcResult] = useState('');

  const calculateInjectorFlow = () => {
    // Get user inputs
    const targetHPValue = parseFloat(targetHP) || 0;
    const cylindersValue = parseInt(cylinders) || 0;
    const bsfcValue = parseFloat(bsfc) || 0;
    const dutyCycleValue = parseFloat(dutyCycle) || 0;

    // Calculate LB/Hr and CC values
    const lbPerHour = (targetHPValue * bsfcValue) / (cylindersValue * (dutyCycleValue / 100));
    const cc = lbPerHour * 10.5; // Conversion factor for CC

    // Set the results in state
    setLbPerHourResult(lbPerHour.toFixed(1));
    setCcResult(cc.toFixed(1));
  };

  return (
    <div className="container">
      <div className="input-container">
      <h1>Injector Flow Calculator</h1>
        <label htmlFor="targetHP">Target Engine HP:</label>
        <input
          type="number"
          id="targetHP"
          value={targetHP}
          onChange={(e) => setTargetHP(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && calculateInjectorFlow()}
        />
        <label htmlFor="cylinders">Number of Cylinders:</label>
        <input
          type="number"
          id="cylinders"
          value={cylinders}
          onChange={(e) => setCylinders(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && calculateInjectorFlow()}
        />
        <label htmlFor="bsfc">B.S.F.C. Value:</label>
        <input
          type="number"
          id="bsfc"
          value={bsfc}
          onChange={(e) => setBsfc(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && calculateInjectorFlow()}
        />
        <label htmlFor="dutyCycle">Max Duty Cycle %:</label>
        <input
          type="number"
          id="dutyCycle"
          value={dutyCycle}
          onChange={(e) => setDutyCycle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && calculateInjectorFlow()}
        />
        <div className="calculate-button-container">
          <button onClick={calculateInjectorFlow}>Calculate</button>
        </div>
      </div>
      <div className="results-container">
        <div className="results-box">
          <h2>Injector Flow (LB/Hr):</h2>
          <p>{lbPerHourResult}</p>
        </div>
        <div className="results-box">
          <h2>Injector Flow (CC):</h2>
          <p>{ccResult}</p>
        </div>
      </div>
      <div className="info-container">
        <h2>B.S.F.C Value Guide</h2>
        <div className="info-box">
          <h3>Naturally Aspirated:</h3>
          <p>Gasoline - .45 to .50</p>
          <p>E85 - .63 to .70</p>
          <p>Methanol - .9 to 1.0</p>
        </div>
        <div className="info-box">
          <h3>Forced Induction:</h3>
          <p>Gasoline - .60 to .65</p>
          <p>E85 - .84 to .91</p>
          <p>Methanol - 1.8 to 2.0</p>
        </div>
      </div>
    </div>
  );
};

export default InjectorFlowCalculator;