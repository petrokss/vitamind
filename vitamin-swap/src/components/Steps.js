import React from 'react'
import PropTypes from 'prop-types';

export default function Steps({
  resetState,
  steps,
}) {
  return(
    <div>
      <button
        className="button"
        onClick={resetState}
      >
        Clear
      </button>
    {steps.map((step, key) => <p key={key}>{step.edges} from {step.from} to {step.color}</p>)}
  </div>
  );
}

Steps.propTypes = {
  resetState: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
};