import React from 'react';

const MeterReading = function (props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Electricity (low tariff)</th>
                    <th>Electricity (normal tariff)</th>
                    <th>Gas</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{ props.reading.electricityLow }</td>
                    <td>{ props.reading.electricityNormal }</td>
                    <td>{ props.reading.gas }</td>
                </tr>
            </tbody>
        </table>
    );
};

MeterReading.propTypes = {
    reading: React.PropTypes.shape({
        recordDate: React.PropTypes.string.isRequired,
        gas: React.PropTypes.number.isRequired,
        electricityNormal: React.PropTypes.number.isRequired,
        electricityLow: React.PropTypes.number.isRequired,
    }),
};

export default MeterReading;
