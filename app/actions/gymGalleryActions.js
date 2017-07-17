//For the Galleries in the GymViewerPages

export function setImage(image) {
    return {
        type: 'IMAGE_SELECTED',
        image
    }
}

export function nextImage(currCounter, arr) {
    return {
        type: 'NEXT_IMAGE',
        counter: currCounter < (arr.length - 1) ? currCounter + 1 : 0
    }
}

export function previousImage(currCounter, arr) {
    return {
        type: 'PREVIOUS_IMAGE',
        counter: currCounter > 0 ? currCounter - 1 : (arr.length - 1)
    }
}
