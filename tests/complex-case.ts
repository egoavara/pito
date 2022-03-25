import { pito } from '../cjs/pito.js'
import Currency, { Options } from 'currency.js'
import tap from 'tap'

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
    })()
// 
// === === === === === === === === === === === === //
const Vec2 = pito.obj({
    x: pito.num(),
    y: pito.num(),
})
enum ItemCode {
    Apple,
    Banana,
    Car,
}
const Item = pito.obj({
    code: pito.enums(ItemCode),
    quantity: pito.int()
})
const LivingEntity = pito.obj({
    name: pito.opt(pito.str()),
    position: Vec2,
    hp: pito.int(),
    inventory: pito.obj({
        money: currency,
        items: pito.arr(Item),
    })
})
const Player = pito.obj({
    name: pito.opt(pito.str()),
    position: Vec2,
    hp: pito.int(),
    inventory: pito.obj({
        money: currency,
        items: pito.arr(Item),
    })
})
const complex = pito.obj({
    aabb: pito.obj({
        aa: Vec2,
        bb: Vec2,
    }),
    // results: pito.arr(

    // )
})
