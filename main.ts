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
    } else {
        armStatus = true
    }
})
function initialize () {
    armStatus = false
    linkStatus = false
    klar = false
}
input.onButtonPressed(Button.AB, function () {
    radio.sendString("oppskytning")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "test link") {
        radio.sendString("link OK")
    }
    if (klar) {
        if (receivedString == "oppskytning") {
            pins.digitalWritePin(DigitalPin.P0, 1)
            basic.pause(200)
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("test link")
    sistSettAktiv = input.runningTime()
    linkStatus = false
})
let sistSettAktiv = 0
let klar = false
let linkStatus = false
let armStatus = false
radio.setGroup(1)
let oppdateringsfrekvens = 200
initialize()
basic.forever(function () {
    if (armStatus && linkStatus) {
        klar = true
    } else {
        klar = false
    }
    lys()
})
