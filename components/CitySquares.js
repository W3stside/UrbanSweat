import React from 'react'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  hideList: {
    display: 'flex', flex: 1,
    height: '0',
    overflow: 'hidden',
  },
  showList: {
    display: 'flex', flex: 1,
    height: '100%', minWidth: '33.33%',
    '@media (max-width: 850px)': {
      minWidth: '50%'
    },
    '@media (max-width: 550px)': {
      minWidth: '100%'
    },
  }
});

export default function CitySquares (props) {

  let filteredData = props.Data[0].cities.filter(
    (item) => {
      return item["name"].toLowerCase().indexOf(props.dataInput.toLowerCase()) !== -1;
    }
  );
  var hideShowList = css(props.dataInput ? styles.showList : styles.hideList);
  return (
    <div style={{marginTop: 40, display: 'flex', flexFlow:'row wrap', justifyContent:'center', alignItems:'center', width:'100%'}}>
      {filteredData.map(
      (city, index) =>
          <div className={hideShowList}>
            <div
            style={{width: '100%', cursor: 'pointer'}}
            key={index}
            onClick={ () => {
              window.open("http://localhost:3007" + city.url);
            }}
            >
                {city.name && city.component ? city.component() : city.name}
            </div>
          </div>
      )}
    </div>
  )
}
