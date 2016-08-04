import React from 'react';

const readingType = React.PropTypes.shape({
    recordDate: React.PropTypes.string.isRequired,
    gas: React.PropTypes.number.isRequired,
    electricityNormal: React.PropTypes.number.isRequired,
    electricityLow: React.PropTypes.number.isRequired,
});

const MeterReading = function (props) {
    return (
        <tr>
            <td>{ props.reading.electricityLow }</td>
            <td>{ props.reading.electricityNormal }</td>
            <td>{ props.reading.gas }</td>
        </tr>
    );
};
MeterReading.propTypes = {
    reading: readingType,
};

const MeterReadings = function (props) {
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
                { props.readings.map((r) => (
                    <MeterReading reading={ r } key={ r.recordDate } />
                )) }
            </tbody>
        </table>
    );
};

MeterReadings.propTypes = {
    readings: React.PropTypes.arrayOf(readingType).isRequired,
};

export default MeterReadings;
