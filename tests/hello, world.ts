import {typio} from '../cjs/typio.js'

const DefAlram = typio.obj({
    at : typio.date(),
    count : typio.opt(typio.num()),
})
type RawAlram = typio.Raw<typeof DefAlram>
type DefAlram = typio.Type<typeof DefAlram>

const a : RawAlram = {
    at : '2012-12-12',
    count : 1
}
const b = typio.unwrap(DefAlram, a)
console.log(b)