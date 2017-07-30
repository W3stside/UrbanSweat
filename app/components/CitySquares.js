//React imports
import React, {Component, PropTypes} from 'react'
//REACT-MOTION
import {TransitionMotion, spring, presets} from 'react-motion'
//React-Router
import {browserHistory} from 'react-router'
//Aphrodite CSS - inline styles
import {StyleSheet,css} from 'aphrodite';
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as citySquaresActions from '../actions/citySquaresActions'
//utils
import utils from '../../utils/utils'
//Components
import HoverStateContainer from './HoverStateContainer'
import Header from './Header'
import MovingOptions from './MovingOptions'
import BackgroundPic from './BackgroundPic'

class CitySquares extends Component {

    handleClick(clickStatus, index, name) {
        browserHistory.push('/GymView/' + name);
        //this.props.handleCitySquareClick(clickStatus, index);
        //this.props.handleDataInput(name);
    }
    handleFilteredData(data) {
        this.props.handleFilteredDataAction(data);
    }

    ////////////////////////////////////////////////////
    ///////// === REACT MOTION config
    ////////////////////////////////////////////////////

    // === SET default ELEM style
    getDefaultStyles() {
        //pull in cities from State Object
        this.props.dataToFilter.map((city) => ({
            data: { ...city
            },
            style: {
                opacity: 0,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
                //height: 0,
            }
        }));
    }
    // === END STYLING + Actual ELEM mapping and building section
    getStyles() {
        const {
            categoriesSelected,
            dataToFilter,
            dataInput
        } = this.props;
        //take initial data and return FILTERED Array
        const filteredData = dataToFilter.filter((item) => {
                let name = item.name ? item.name : item.gym.name;
                let lastCatSelected = categoriesSelected.length ? categoriesSelected[categoriesSelected.length - 1]._id : null;

                //CHECK if lastCatSelected is NOT null (meaning no categories have been selected) - IF the arr has LENGTH (meaning a cat was chosen) then
                // filter for BOTH categories AND text
                // ELSE just check the SearchBar text
                return lastCatSelected === null ? name.toLowerCase().indexOf(dataInput.toLowerCase()) > -1 : item.categories.indexOf(lastCatSelected) > -1 && name.toLowerCase().indexOf(dataInput.toLowerCase()) > -1;

                //return item.categories.indexOf(lastCatSelected) > -1 && name.toLowerCase().indexOf(dataInput.toLowerCase()) > -1;
            })
            .map((item, index) => {
                let name = item.name ? item.name : item.gym.name;
                return {
                    key: name,
                    data: {
                        ...item
                    },
                    style: {
                        opacity: spring(1, presets.gentle),
                        flexGrow: spring(1, presets.gentle),
                        flexShrink: spring(1, presets.gentle),
                        flexBasis: spring(utils.rdmNum(275,700), presets.gentle),
                        //height: spring(337, presets.gentle),
                    }
                }
            });
        //Pass the newly filtered Array to Actions to Reduce to State
        this.handleFilteredData(filteredData);
        return filteredData;
    }
    // === Styling for ELEM entry
    willEnter() {
        return {
            opacity: 1,
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 0,
            //height: 0
        };
    };
    // === Styling for ELEM exit
    willLeave() {
        return {
            opacity: spring(0),
            flexGrow: spring(0),
            flexShrink: spring(0),
            flexBasis: spring(0),
            //height: spring(337)
        }
    };

    //Data passed in via dataToFilter prop MUST be pointing at the correct slices of data before getting HERE
    render() {
        // === Has someone input data into FORM? Yes? THEN show components that match. NO? THEN hide them.
        var hideShowList = css(styles.defaultFlex, this.props.dataInput ? styles.showList : styles.hideList);

        return (
            <div id = "citySquareWrapper" className="flex rowWrap aCenter jCenter width100">
                <TransitionMotion
                defaultStyles = {this.getDefaultStyles()}
                styles = {this.getStyles(this.props.dataInputTypeToFilter)}
                willEnter = {this.willEnter}
                willLeave = {this.willLeave}>
                    {motionContent =>
                        <div id = "citSquareLeft" className = {css(styles.citySquareLeft)}>
                            {motionContent.map(({key, style, data, index}) => {
                                let name = data.name ? data.name : data.gym.name;
                                return (
                                    <div
                                    key = {key}
                                    style = {style}
                                    className = {`flex overflowHidden ${css(styles.hoverCSS)}`}>
                                        <div style = {{width: '100%', cursor: 'pointer', minHeight: 430, maxHeight: 430}} onClick = {this.handleClick.bind(this, this.props.clickStatus, index, name.toLowerCase())}>
                                            <HoverStateContainer style = {styles.citySquareContainerStyle}>
                                                <BackgroundPic image={data.bgImageURL}/>
                                                <Header name = {name.toUpperCase()} style = {styles.smallCityChooserHeader}/>
                                                {this.props.renderMovingOptions ? <MovingOptions index = {index} categories = {data.categories} style = {styles.movingOptionsStyle}/> : <div/>}
                                            </HoverStateContainer>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    }
                </TransitionMotion>
            </div>
        )
    }
}

CitySquares.propTypes = {
    Data: PropTypes.array || PropTypes.object,
    dataInput: PropTypes.string
}
// === Pass STATE from STORE as PROPS
function mapStateToProps(state) {
    return {
        clickStatus: state.citySquares.clicked,
        id: state.citySquares.id,
        dataInput: state.dataInput.dataInput,

        categoriesSelected: state.categories.categoriesSelected
    }
}
// === Pass ACTION FNS from ACTION MODULE as PROPS
function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(citySquaresActions, dispatch);
}
// === Aphrodite Styling
const styles = StyleSheet.create({
    defaultFlex: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    csDefault: {
        display: 'flex',
        /*flex: '1 0 33%', */
        overflow: 'hidden',

        '@media (max-width: 850px)': {
            //flex: '1 0 50%'
        },
        '@media (max-width: 550px)': {
            //flex: '1 0 100%'
        },
    },
    hideList: {
        height: '0',
        overflow: 'hidden'
    },
    showList: {
        height: '100%',
    },
    hoverCSS: {

    },
    citySquareLeft: {
        display: 'flex',
        flex: '1 0 33%',
        flexFlow: 'row wrap',
        '@media (max-width: 850px)': {
            flex: '1 0 50%'
        },
    },
    clickOpen: {
        width: '67%',
        '@media (max-width: 850px)': {
            width: '50%'
        },
        '@media (max-width: 550px)': {
            width: '100%'
        },
    },
    clickHideHeight: {
        flex: 0,
        visibility: 'hidden',
    },
    //citysquares
    smallCityChooserHeader: {
        color: 'ghostwhite',
        //font: 'italic bold 250% "Helvetica"',
        fontFamily: 'Helvetica',
        fontStyle: 'italic',
        fontWeight: 'bold',
        margin: '0 0 12px 0',
        position: 'static',
        zIndex: '5'
    },
    citySquareContainerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'column nowrap',
        height: '100%',
        /*minHeight: 320, maxHeight: 320,*/ width: '100%',
        position: 'relative',
        overflow: 'hidden',
        ':hover': {
            backgroundColor: 'rgba(0,0,0,0.4)',
            transition: 'background-color 0.5s ease-in-out'
        },
        transition: 'background-color 0.5s ease-in-out'

    },
    movingOptionsStyle: {
        listStyle: 'none',
        color: 'white',
        paddingLeft: '0',
        margin: '0',
        fontSize: '100%',
        fontStyle: 'italic',
        lineHeight: '1'
    }
});
// === CONNECT component to REACT STORE
export default connect(mapStateToProps, mapActionCreatorsToProps)(CitySquares)
