//Hmaburger menu actions

export function handleMouseOver() {
    return {
        type: 'ON_MOUSE_HOVER',
        hover: true
    }
}

export function handleMouseLeave() {
    return {
        type: 'OFF_MOUSE_HOVER',
        hover: false
    }
}

export function handleMenuClick(clickStatus) {
    return {
        type: 'MENU_CLICK',
        menuClick: !clickStatus
    }
}
