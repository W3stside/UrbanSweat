//React imports
import React, {Component, PropTypes} from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
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
    display: 'flex', flex: '1 0 33%',
    overflow: 'hidden',

    '@media (max-width: 850px)': {
      flex: '1 0 50%'
    },
    '@media (max-width: 550px)': {
      flex: '1 0 100%'
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
  //Data passed in via dataToFilter prop MUST be pointing at the correct slices of data before getting HERE
  render () {

    let filteredData = this.props.dataToFilter.filter(
      (item) => {
        if (this.props.dataInput.toLowerCase() === "all") {
          return item["name"];
        }
        return item["name"].toLowerCase().indexOf(this.props.dataInput.toLowerCase()) !== -1;
      }
    );

    var hideShowList = css(styles.defaultFlex, this.props.dataInput ? styles.showList : styles.hideList);
    const citySquare = filteredData.map(
    (item, index) =>
        <div key={item.name} className={css(styles.csDefault, styles.hoverCSS)}>
          <div
            style={{width: '100%', cursor: 'pointer'}}
            onClick={ this.handleClick.bind(this, this.props.clickStatus, index, item.name.toLowerCase()) }>

              <HoverStateContainer style={styles.citySquareContainerStyle}>
               <BackgroundPic image={item.bgImageURL}/>
               <Header name={item.name.toUpperCase()} style={styles.smallCityChooserHeader}/>
               <MovingOptions index={index} categories={ item.categories } style={styles.movingOptionsStyle}/>
             </HoverStateContainer>

          </div>
        </div>
    );
    return (
        <div id="citySquareWrapper" className={css(styles.defaultFlex)} style={{marginTop: 40}}>
          <div id="citSquareLeft" className={css(styles.citySquareLeft)}>
            <CSSTransitionGroup
              className={hideShowList}
              component='div'
              transitionName="mappedItems"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {citySquare}
            </CSSTransitionGroup>
          </div>
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
