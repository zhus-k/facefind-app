import React from 'react'

const Rank = ({ name, requests }) => {
    return(
        <div>
            <div className="black f3">
                {`${ name }. Number of Requests Made`}
            </div>
            <div className="black f1">
                {`${ requests }`}
            </div>
        </div>
    );
}

export default Rank;