import React from 'react'
import {compose, withProps} from 'recompose'

// === APHRODITE
import {StyleSheet,css} from 'aphrodite'

const Button = (props) => {
    return (
        <button
            className={css(props.disabled ? styles.hidden : null)}
            >
            {props.text}
        </button>
    )
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none'
    }
})

export default compose(
    withProps({
        disabled: false,
        text: 'Map View'
    })
)(Button);
