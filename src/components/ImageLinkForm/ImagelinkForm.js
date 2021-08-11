import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit: onUrlSubmit }) => {
    return(
        <div>
            <p className='f3'>
            {'This app will detect faces in images you submit below.'}
            </p>
            <div className='center'>
                <div className='form pa3 br3 shadow-5 center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange } onSubmit= { onUrlSubmit }/>
                    <button className='w-30 frow f4 link ph3' onClick={ onUrlSubmit }>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;