import React from 'react';
import './HistoryItem.css';

const HistoryItem = ({ id, url, box, dateRequested }) => {
    return(
        <div className='grid-item br3 pa3 shadow-5 history-card'>
            <div className='history-card-top'>
                <p>{ id }</p>
                <p className='delete-button' deleteRequest={ () => this.props.deleteRequest() }>X</p>
            </div>
            <img src={ url } alt='' height='300px' width='300px'></img>
            <link className='center' href={ url }>{ url }</link>
            <p className='center'>{ dateRequested }</p>
        </div>
    );
}

export default HistoryItem;