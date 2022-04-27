import currency, { Options } from 'currency.js'
import tap from 'tap'
import { pito } from '../cjs/pito.js'
// not std types, currency type
const usd = pito
    .define(
        { type: 'string' },
        (option?: Options) => ({
            option: {},
            extra: { $currency: option },
        }),

    )
    .build(
        function (data: currency) {
            return data.format(this.$currency)
        },
        function (raw: string) {
            return currency(raw, this.$currency)
        },
    )
// 
const curr = usd()
const currWithOption = usd({
    precision: 4,
})
tap.same(
    currWithOption.$currency,
    { precision: 4, },
)
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
        pito.wrap(curr, currency("$1,234")),
        "$1,234.00",
    )
    t.same(
        pito.wrap(currWithOption, currency("$1,234", { precision: 4, })),
        "$1,234.0000",
    )
})
tap.test('unwrap', async t => {
    t.same(
        pito.unwrap(curr, "$1,234.00"),
        currency("$1,234"),
    )
    t.same(
        pito.unwrap(currWithOption, "$1,234.0000"),
        currency("$1,234", {
            precision: 4,
        }),
    )
})