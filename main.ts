function lys () {
    if (armStatus) {
        RocketLink.armStatusLys(true)
    } else {
        RocketLink.armStatusLys(false)
    }
    if (linkStatus) {
        RocketLink.linkStatusLys(true)
    } else {
        RocketLink.linkStatusLys(false)
    }
    if (klar) {
        RocketLink.oppskytningStatusLys(true)
    } else {
        RocketLink.oppskytningStatusLys(false)
    }
}
input.onButtonPressed(Button.A, function () {
    if (armStatus) {
        armStatus = false
        radio.sendString("armLP ikke OK")
    } else {
        armStatus = true
        radio.sendString("armLP OK")
    }
})
function initialize () {
    armStatus = false
    linkStatus = false
    klar = false
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "test link") {
        radio.sendString("link OK")
    }
    if (klar) {
        if (receivedString == "oppskytning") {
            pins.digitalWritePin(DigitalPin.P0, 1)
            basic.pause(200)
            pins.digitalWritePin(DigitalPin.P0, 0)
            initialize()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("test link")
    linkStatus = false
})
let klar = false
let linkStatus = false
let armStatus = false
radio.setGroup(1)
initialize()
basic.forever(function () {
    if (armStatus && linkStatus) {
        klar = true
    } else {
        klar = false
    }
    lys()
})
