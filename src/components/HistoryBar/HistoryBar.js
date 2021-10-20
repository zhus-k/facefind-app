import React from 'react';
import HistoryItem from '../HistoryItem/HistoryItem';
import './HistoryBar.css';

class HistoryBar extends React.Component{

    deleteRequest(){
        // fetch delete request to delete
    };

    render(){
        const { history } = this.props;

        return(
            <div className='hori-scroll'>
                {
                    history.map((item, i) => {
                        return <HistoryItem
                                    id={ item.id }
                                    url={ item.url }
                                    box={ item.box }
                                    dateRequested={ item.dateRequested }
                                    deleteRequest={ this.deleteRequest }
                                />;
                    })
                }
            </div>
        );
    }
}

export default HistoryBar;