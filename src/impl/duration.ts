function parseIntForDuration(text: string, field: string): number {
    if (text.length === 0) {
        return 0
    }
    const result = parseInt(text)
    if (result <= 0) {
        throw new Error(`${result} <= 0 not allowed for field '${field}'`)
    }
    return result
}
function parseFloatForDuration(text: string, field: string): number {
    if (text.length === 0) {
        return 0
    }
    const result = parseFloat(text)
    if (result === 0) {
        throw new Error(`${result} <= 0 not allowed for field '${field}'`)
    }
    return result
}
export type Duration = {
    negative: boolean,
    years: number,
    months: number,
    weeks: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
    // methods
    toString(): string,
}
export function Duration(raw: string): Duration {

    const matching = raw.match(/^([+-])?P(([0-9]+)Y)?(([0-9]+)M)?(([0-9]+)W)?(([0-9]+)D)?(T(([0-9]+)H)?(([0-9]+)M)?(([0-9]+(\.[0-9]+)?)S)?)?$/)
    if (matching === null) {
        throw new Error(`invalid format raw string, '${raw}'`)
    }
    if (matching[12].length === 0 && matching[14].length === 0 && matching[16].length === 0) {
        throw new Error(`invalid format raw string, 'T' without following contents not allowed, '${raw}'`)
    }
    const negative = matching[1] === '-' ? true : false
    const years = parseIntForDuration(matching[3], 'Year')
    const months = parseIntForDuration(matching[5], 'Month')
    const weeks = parseIntForDuration(matching[7], 'Weak')
    const days = parseIntForDuration(matching[9], 'Day')
    const hours = parseIntForDuration(matching[12], 'Hour')
    const minutes = parseIntForDuration(matching[14], 'Minute')
    const seconds = parseFloatForDuration(matching[16], 'Second')
    return {
        negative,
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
        toString() {
            let sign = this.negative ? '-' : ''
            let pPart = 'P'
            let tPart = 'T'
            // P part
            if (Math.trunc(this.years) > 0) {
                pPart += `${Math.trunc(this.years)}Y`
            }
            if (Math.trunc(this.months) > 0) {
                pPart += `${Math.trunc(this.months)}M`
            }
            if (Math.trunc(this.weeks) > 0) {
                pPart += `${Math.trunc(this.weeks)}W`
            }
            if (Math.trunc(this.days) > 0) {
                pPart += `${Math.trunc(this.days)}D`
            }
            // T part
            if (Math.trunc(this.hours) > 0) {
                tPart += `${Math.trunc(this.hours)}H`
            }
            if (Math.trunc(this.minutes) > 0) {
                tPart += `${Math.trunc(this.minutes)}M`
            }
            if (this.seconds > 0) {
                tPart += `${this.seconds}S`
            }
            // return
            if (pPart === 'P' && tPart === 'T') {
                throw new Error("Zero duration not allow")
            }
            if (pPart === 'P') {
                return sign + 'P' + tPart
            }
            if (pPart === 'T') {
                return sign + pPart
            }
            return sign + pPart + tPart
        }
    }
}