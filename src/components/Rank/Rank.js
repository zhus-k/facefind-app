import React from 'react'

const Rank = ({ name, entries }) => {
    return(
        <div>
            <div className="black f3">
                {`${ name }, your Current Use Count is `}
            </div>
            <div className="black f1">
                {`${ entries }`}
            </div>
        </div>
    );
}

export default Rank;