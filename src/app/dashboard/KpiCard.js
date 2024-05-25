import React from 'react';
import PropTypes from 'prop-types';
import './KpiCard.css';

const KpiCard = ({ title, value }) => {
    return (
        <div className="kpi-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
};

KpiCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default KpiCard;
