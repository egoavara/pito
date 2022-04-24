
export type Time = {
    hours: number
    minutes: number
    seconds: number
    zone?: number | 'Z'
    // methods
    toOffset(): number
    toString(): string

}
export function Time(raw: string): Time {
    const matching = raw.match(/^([0-9]{2}):([0-9]{2}):([0-9]{2}(\.[0-9]+)?)(([+-][0-9]{2}:[0-9]{2})|Z)?$/)
    if (matching === null) {
        throw new Error(`unexpected raw string, '${raw}'`)
    }
    const hours = parseInt(matching[1])
    const minutes = parseInt(matching[2])
    const seconds = parseFloat(matching[3])
    let zone: number | 'Z' | undefined = undefined
    if (matching[5] === 'Z') {
        zone = 'Z'
    }


    // 
    return {
        hours,
        minutes,
        seconds,
        zone,
        toOffset() {
            if (this.zone === undefined) {
                return new Date().getTimezoneOffset()
            }
            if (this.zone === 'Z') {
                return 0
            }
            return this.zone
        },
        toString() {
            if (!(0 <= this.hours && this.hours <= 24) || !Number.isInteger(this.hours)) {
                throw new Error(`invalid hours ${this.hours}`)
            }
            if (!(0 <= this.minutes && this.minutes <= 60) || !Number.isInteger(this.hours)) {
                throw new Error(`invalid minutes ${this.minutes}`)
            }
            if (!(0 <= this.seconds && this.seconds <= 60)) {
                throw new Error(`invalid seconds ${this.seconds}`)
            }
            const secondInteger = Math.trunc(this.seconds)
            const secondDecimal = this.seconds - secondInteger
            const offset = this.toOffset()
            // 
            const hh = this.hours.toString().padStart(2, '0')
            const mm = this.minutes.toString().padStart(2, '0')
            const ss = secondInteger.toString().padStart(2, '0')
            const dmmmm =
                secondDecimal === 0
                    ? ''
                    : secondDecimal.toString().slice(1)
            let z: string
            if (offset === 0) {
                z = 'Z'
            } else if (offset < 0) {
                z = '-'
                    // hh
                    + Math.trunc(offset / 100).toString().padStart(2, '0')
                    // mm
                    + Math.trunc(offset % 100).toString().padStart(2, '0')
            } else {
                z = '+'
                    // hh
                    + Math.trunc(offset / 100).toString().padStart(2, '0')
                    // mm
                    + Math.trunc(offset % 100).toString().padStart(2, '0')
            }
            return `${hh}:${mm}:${ss}${dmmmm}${z}`
        },
    }
}