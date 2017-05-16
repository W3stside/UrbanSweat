const styles = StyleSheet.create({
  p: {
    color: 'ghostwhite',
    font: 'Helvetica',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  padding_0: {
    padding: '0',
    transition: 'all 2s linear'
  },
  strikethroughHover: {
    ':hover': {
      textDecoration: 'line-through',
      textShadow: '0 0 2px #10FF8C'
    }
  },
  opacity_0: {
    opacity: '0'
  },
  hideList: {
    height: '0',
    overflow: 'hidden'
  },
  showList: {
    height: '100%',
  },
  logoStyle: {
    margin : '8%',
    width : '30vh'
  },
  cityChooserHeader: {
    fontSize: '120%',
    position: 'static',
    zIndex: '1',
    color: 'black',
    margin: '0 0 40px 0'
  },
  smallCityChooserHeader: {
    color: 'ghostwhite',
    font: 'italic bold 250% "Helvetica"',
    margin: '15px 0 0 0',
    position: 'static',
    zIndex: '5'
  },
  movingOptionsHeader: {
    fontSize: '125%',
    lineHeight: '0.5',
    position: 'static',
    zIndex: '5'
   },
  citySquareContainerStyle: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    height: 'auto',
    padding: '15%'
  },
  movingOptionsStyle: {
    listStyle: 'none',
    color: 'white',
    paddingLeft: '0',
    margin: '0',
    fontSize: '91.1%',
    fontStyle: 'italic',
    lineHeight: '1'
 }
});

const opacityKeyframes = {
    'from': {
        opacity: 0,
    },

    'to': {
        opacity: 1,
    }
};

const animationStyles = StyleSheet.create({
  movingOptionsKeyFrames: {
    animationName: opacityKeyframes,
    animationDuration: '1.2s'
  }
})

class CityChooser extends React.Component {
  render () {

    return (
      <div>
        <div className="container-fluid">
          <div className="row text-center">

            <div className={'col-xs-12' + ' ' + css(styles.padding_0)}>
               <Logo style={styles.logoStyle}/>
            </div>

          </div>
        </div>

        <div className="container-fluid citychooser">
          <div className="row text-center">

            <div className={'col-xs-12' + ' ' + css(styles.padding_0)}>
              <Header name="Choose Your City" style={styles.cityChooserHeader}/>
            </div>

            <SearchBar
              cities={cities}
              placeholder='Find your spot'
             />

          </div>
        </div>
      </div>
    );
  }
}
//End above

class Header extends React.Component {

  static propTypes () {
    styleName: React.PropType.object
  }

  render() {
    return <p className={css(this.props.style)}>{this.props.name}</p>;
  }
}

//internal city squares
class HoverStateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverState: false
    }
    this._handleMouseEnter = this._handleMouseEnter.bind(this)
    this._handleMouseLeave = this._handleMouseLeave.bind(this)
  }

  _handleMouseEnter() {
    this.setState (
      {
        hoverState: true
      }
    );
  }

  _handleMouseLeave () {
    this.setState (
      {
        hoverState: false
      }
    );
  }

  render() {

    var childrenWithProps = React.Children.map( this.props.children ,
      ( child ) => React.cloneElement( child , {
        hoverState: this.state.hoverState
      })
    );

    return (
      <div
        onMouseEnter = {
          this._handleMouseEnter
        }
        onMouseLeave = {
          this._handleMouseLeave
        }
        className = {css(this.props.style)}
      >

        {childrenWithProps}

      </div>
    );
  }
}

function MovingOptions (props) {
  const activities = props.activities;
  const listActivities = activities.map (
    (activity) =>
      <li className={props.hoverState ? css(animationStyles.movingOptionsKeyFrames) : css(styles.opacity_0)} key={activity.id}>
        <a className={css(styles.strikethroughHover)} href={activity.url} style={{color: 'white'}}>{activity.title}</a>
      </li>
    );
    return (
      <ul className={css(props.style)}>
          {listActivities}
      </ul>
   );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInput: ''
    }
    this._handleInputText = this._handleInputText.bind(this);
  }

  _handleInputText(input) {
    this.setState({
      dataInput: input.target.value
    });
  }

  render () {

    let filteredCities = this.props.cities.filter(
      (city) => {
        return city.name.toLowerCase().indexOf(this.state.dataInput.toLowerCase()) !== -1;
      }
    );
    var hideShowList = css(
      this.state.dataInput ? styles.showList : styles.hideList
    );

    return (
      <div style={{margin: '0 15px 0 15px'}}>

        <form>
           <input
             type='text'
             value={this.state.dataInput}
             onChange={this._handleInputText}
             placeholder={this.props.placeholder}
             />
        </form>

        <div className='row' style={{marginTop: '15px'}}>
          {filteredCities.map(
            (city) =>
              <div className={hideShowList}>
                <div className={'col-md-4' + ' ' + css(styles.padding_0)}
                  key={city.id}>
                    {city.name && city.component ? city.component : city.name}
                </div>
              </div>
            )}
        </div>

      </div>
    );
  }
}

const activities = [
  {title: 'YOGA', id: 1, url: "#"},
  {title: 'WEIGHTLIFTING', id: 2, url: "#"},
  {title: 'CROSSFIT', id: 3, url: "#"},
  {title: 'DANCE', id: 4, url: "#"},
  {title: 'BOXING', id: 5, url: "#"},
  {title: '...MORE', id: 0, url: "#"}
];

const cities = [
  {
    id: 1,
    name: 'Paris',
   component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic />
                <Header name="PARIS" style={styles.smallCityChooserHeader}/>
                <MovingOptions stateHover = {null} activities={activities} style={styles.movingOptionsStyle}/>
                </HoverStateContainer>
  },
  {
    id: 2,
    name: 'Amsterdam',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"http://minimalblogs.com/wp-content/uploads/IMG_6224.jpg"}/>
                <Header name="AMSTERDAM" style={styles.smallCityChooserHeader} />
                <MovingOptions activities={activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 3,
    name: 'Copenhagen',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://farm6.static.flickr.com/5581/14036964225_40dbb3e429_b.jpg"}/>
                <Header name="COPENHAGEN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 4,
    name: 'Brussels',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://c1.staticflickr.com/3/2049/2442825439_0ce24be7db_o.jpg"}/>
                <Header name="BRUSSELS" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 5,
    name: 'Berlin',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"}/>
                <Header name="BERLIN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 6,
    name: 'London',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
                <Header name="LONDON" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  }
]
