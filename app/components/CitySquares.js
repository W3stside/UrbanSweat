//React imports
import React, {Component, PropTypes} from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
//React-Router
import { browserHistory } from 'react-router'
//Aphrodite CSS - inline styles
import { StyleSheet, css } from 'aphrodite';
//import css from '../css/reactTransitions.css'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions/cityActions'
//Components
import HoverStateContainer from './HoverStateContainer'
import Header from './Header'
import MovingOptions from './MovingOptions'
import BackgroundPic from './BackgroundPic'

const styles = StyleSheet.create({
  defaultFlex: {
    display: 'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center',
    width:'100%'
  },
  csDefault: {
    display: 'flex', /*flex: '1 0 33%', */
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
  citySquareRight: {
    display: 'flex', alignSelf: 'flex-start', justifyContent: 'center',
    overflow: 'hidden',
    width: '0%',

    transition: 'all 1.2s ease-in-out',
  },
  citySquareLeft: {
    display: 'flex', flex: '1 0 33%', flexFlow: 'row wrap',
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
    font: 'italic bold 250% "Helvetica"',
    margin: '0 0 12px 0',
    position: 'static',
    zIndex: '5'
  },
  citySquareContainerStyle: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'column nowrap',
    height: 'auto', minHeight: 320, maxHeight: 320, width: '100%',
    position: 'relative',
    overflow: 'hidden',
    padding: '10% 0',
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
    fontSize: '140%',
    fontStyle: 'italic',
    lineHeight: '1'
  }
});

class CitySquares extends Component {

  handleClick (clickStatus, index, name) {

    //browserHistory.push('/FindYourGym/' + name.toLowerCase() + '/' + id + '/categories');
    this.props.handleCitySquareClick(clickStatus, index);
    this.props.handleDataInput(name);
  }

  getDefaultStyles () {
    //pull in cities from State Object
    this.props.dataToFilter.map( (city) => (
      {data: {...city},
      style: {
        opacity: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      }}) );
  }

  getStyles () {
    const {dataToFilter, dataInput} = this.props;
    //take initial data and return FILTERED Array
    return dataToFilter.filter( ({name}) => {
      if (this.props.dataInput.toLowerCase() === "all") {
        return name;
      }
      return name.toLowerCase().indexOf(dataInput.toLowerCase()) !== -1;
    })
    .map( (item, index) => {
      return {
        key: item.name,
        data: {
          ...item
        },
        style: {
          opacity: spring(1, presets.gentle),
          flexGrow: spring(1, presets.gentle),
          flexShrink: spring(1, presets.gentle),
          flexBasis: spring(300, presets.gentle),
        }
      }
    });
  }

  willEnter() {
    return {
      opacity: 1,
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 0,
    };
  };

  willLeave () {
    return {
      opacity: spring(0),
      flexGrow: spring(0),
      flexShrink: spring(0),
      flexBasis: spring(0),
    };
  };

  //Data passed in via dataToFilter prop MUST be pointing at the correct slices of data before getting HERE
  render () {
    var hideShowList = css(styles.defaultFlex, this.props.dataInput ? styles.showList : styles.hideList);

    return (
        <div id="citySquareWrapper" className={css(styles.defaultFlex)} style={{marginTop: 40}}>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willEnter={this.willEnter}
            willLeave={this.willLeave}>
            {motionContent =>
              <div id="citSquareLeft" className={css(styles.citySquareLeft)}>
                {motionContent.map(
                ( {key, style, data: {_id, name, bgImageURL, categories}}, index ) =>
                      <div key={key} style={style} className={css(styles.csDefault, styles.hoverCSS)}>
                        <div
                          style={{width: '100%', cursor: 'pointer'}}
                          onClick={ this.handleClick.bind(this, this.props.clickStatus, index, name.toLowerCase()) }>

                            <HoverStateContainer style={styles.citySquareContainerStyle}>
                             <BackgroundPic image={bgImageURL}/>
                             <Header name={name.toUpperCase()} style={styles.smallCityChooserHeader}/>
                             <MovingOptions index={index} categories={ categories } style={styles.movingOptionsStyle}/>
                           </HoverStateContainer>

                        </div>
                      </div>
                )}
              </div>
            }
          </TransitionMotion>
          <div id="citySquareRight" className={css(styles.citySquareRight, this.props.clickStatus ? styles.clickOpen : null)}>
            <HoverStateContainer style={styles.citySquareContainerStyle}>
              <BackgroundPic/>
              <Header name={this.props.dataInput.toUpperCase()} style={styles.smallCityChooserHeader}/>

            </HoverStateContainer>
          </div>
        </div>
    )
  }
}
//className={hideShowList + ' ' + css(this.props.clickStatus && this.props.id !== index ? styles.clickHideHeight : '')}
CitySquares.propTypes = {
  Data: PropTypes.array || PropTypes.object,
  dataInput: PropTypes.string
}

function mapStateToProps (state) {
  return {
    clickStatus: state.citySquares.clicked,
    id: state.citySquares.id
  }
}

function mapActionCreatorsToProps (dispatch) {
  return bindActionCreators(Actions,dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(CitySquares)
