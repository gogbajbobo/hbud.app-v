function delay(time: number, value?: any) {

    return new Promise((resolve) => {
        setTimeout(resolve.bind(null, value), time)
    });

}

function delayReject(time: number, value?: any) {

    return new Promise((resolve, reject) => {
        setTimeout(reject.bind(null, value), time)
    });

}

export default {
    delay,
    delayReject
}
