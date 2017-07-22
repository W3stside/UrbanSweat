import React from 'react'
import {StyleSheet,css} from 'aphrodite'

import CitySquares from './CitySquares'
import SearchBar from './SearchBar'

class CitySearchBarContent extends React.Component {

    componentWillReceiveProps(nextProps) {
        console.log('NEXT_PROPS = ' + nextProps)
    }

    render() {
        return (
            <div className="flex textCenter fullWidthHeight">
                <div className="flex colNoWrap width100 textCenter">
                    <div style={{margin: '0 auto 37px auto', width: '85%'}}>
                        <SearchBar
                        shadowFX={true}
                        placeholder='Find your spot'/>
                    </div>
                    <div className="marginTopAuto width100">
                        <CitySquares
                        dataToFilter={this.props.dbData}
                        renderMovingOptions={true}
                        verticalFade={false}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default CitySearchBarContent;
