import Currency, { Options } from 'currency.js'
import tap from 'tap'
import { pito } from '../cjs/pito.js'
// not std types, currency type
const currency = pito
    .def(pito.str())
    .build<Currency, Options>({
        symbol: 'currency.js',
        strict() {
            return {
                type: 'string',
            }
        },
        unwrap(raw: string): Currency {
            return Currency(raw, this.$option)
        },
        wrap(tp: Currency): string {
            return tp.format()
        }
    })
// 
const curr = currency()
const currWithOption = currency({
    precision: 4,
})
tap.test('strict', async t => {
    t.same(
        pito.strict(curr),
        { type: 'string' },
    )
    t.same(
        pito.strict(currWithOption),
        { type: 'string' },
    )
})
tap.test('wrap', async t => {
    t.same(
        pito.wrap(curr, Currency("$1,234")),
        "$1,234.00",
    )
    t.same(
        pito.wrap(currWithOption, Currency("$1,234", { precision: 4, })),
        "$1,234.0000",
    )
})
tap.test('unwrap', async t => {
    t.same(
        pito.unwrap(curr, "$1,234.00"),
        Currency("$1,234"),
    )
    t.same(
        pito.unwrap(currWithOption, "$1,234.0000"),
        Currency("$1,234", {
            precision: 4,
        }),
    )
})