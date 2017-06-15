export const cities = [
  {
    id: 1,
    name: 'Paris',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic />
                 <Header name="PARIS" style={styles.smallCityChooserHeader}/>
                 <MovingOptions stateHover = {null} activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 2,
    name: 'Amsterdam',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                 <BackgroundPic image={"http://minimalblogs.com/wp-content/uploads/IMG_6224.jpg"}/>
                 <Header name="AMSTERDAM" style={styles.smallCityChooserHeader} />
                 <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 3,
    name: 'Copenhagen',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://farm6.static.flickr.com/5581/14036964225_40dbb3e429_b.jpg"}/>
                <Header name="COPENHAGEN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 4,
    name: 'Brussels',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://c1.staticflickr.com/3/2049/2442825439_0ce24be7db_o.jpg"}/>
                <Header name="BRUSSELS" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 5,
    name: 'Berlin',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8c8c845227921.5829f6ff5a2f0.jpg"}/>
                <Header name="BERLIN" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  },
  {
    id: 6,
    name: 'London',
    component: <HoverStateContainer style={styles.citySquareContainerStyle}>
                <BackgroundPic image={"https://static1.squarespace.com/static/55c5a739e4b0d93b6174fb9e/573ac25d2b8dde95f0ee1a40/573b9c7907eaa096db954ede/1463524544831/DSCF9868-Edit-1-3.jpg"}/>
                <Header name="LONDON" style={styles.smallCityChooserHeader}/>
                <MovingOptions activities={Activities} style={styles.movingOptionsStyle}/>
               </HoverStateContainer>
  }
]
