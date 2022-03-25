import { pito } from '../cjs/pito.js'
import Currency, { Options } from 'currency.js'
import tap from 'tap'

const krw = pito
    .def(pito.str())
    .build<Currency, Options>({
        symbol: 'currency.js - KRW',
        strict() {
            return {
                type: 'string',
            }
        },
        unwrap(raw: string): Currency {
            return Currency(raw, this.$option)
        },
        wrap(tp: Currency): string {
            return tp.format(this.$option)
        }
    })({symbol : '₩'})
// 
// === === === === === === === === === === === === //
const Vec2 = pito.obj({
    x: pito.num(),
    y: pito.num(),
})
enum ItemCode {
    Apple = 0,
    Banana = 1,
    Car = 2,
}
const Item = pito.obj({
    code: pito.enums(ItemCode),
    quantity: pito.int()
})
const LivingEntity = pito.obj({
    name: pito.opt(pito.str()),
    position: Vec2,
    hp: pito.int(),
})
const Player = pito.obj({
    name: pito.opt(pito.str()),
    position: Vec2,
    hp: pito.int(),
    inventory: pito.obj({
        money: krw,
        items: pito.arr(Item),
    })
})
const Entity = pito.uobj(
    'type',
    {
        'living-entity': LivingEntity,
        'player': Player,
    }
)
const complex = pito.obj({
    aabb: pito.obj({
        aa: Vec2,
        bb: Vec2,
    }),
    results: pito.arr(Entity)
})

tap.same(
    pito.strict(complex),
    {
        type: 'object',
        properties: {
            aabb: {
                type: 'object',
                properties: {
                    aa: {
                        type: 'object',
                        properties: {
                            x: { type: "number", },
                            y: { type: "number" },
                        },
                        required: ['x', 'y'],
                        additionalProperties: false,
                    },
                    bb: {
                        type: 'object',
                        properties: {
                            x: { type: "number", },
                            y: { type: "number" },
                        },
                        required: ['x', 'y'],
                        additionalProperties: false,
                    },
                },
                required: ['aa', 'bb'],
                additionalProperties: false,
            },
            results: {
                type: 'array',
                items: {
                    anyOf: [
                        {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                position: {
                                    type: 'object',
                                    properties: {
                                        x: { type: "number", },
                                        y: { type: "number" },
                                    },
                                    required: ['x', 'y'],
                                    additionalProperties: false,
                                },
                                hp: { type: 'integer' },
                                type: { const: 'living-entity' }
                            },
                            required: ['position', 'hp', 'type'],
                            additionalProperties: false,
                        },
                        {
                            type: 'object',
                            properties: {
                                name: { type: 'string' },
                                position: {
                                    type: 'object',
                                    properties: {
                                        x: { type: "number", },
                                        y: { type: "number" },
                                    },
                                    required: ['x', 'y'],
                                    additionalProperties: false,
                                },
                                hp: { type: 'integer' },
                                inventory: {
                                    type: 'object',
                                    properties: {
                                        money: { type: 'string' },
                                        items: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    code: {
                                                        anyOf: [
                                                            { const: 0 },
                                                            { const: 1 },
                                                            { const: 2 },
                                                        ]
                                                    },
                                                    quantity: { type: 'integer' },
                                                },
                                                required: ['code', 'quantity'],
                                                additionalProperties: false,
                                            }
                                        }
                                    },
                                    required: ['money', 'items',],
                                    additionalProperties: false,
                                },
                                type: { const: 'player' }
                            },
                            required: ['position', 'hp', 'inventory', 'type'],
                            additionalProperties: false,
                        },
                    ]
                },
            },
        },
        required: ['aabb', 'results'],
        additionalProperties: false,
    }
)

tap.same(
    pito.wrap(complex, {
        aabb: {
            aa: { x: 1, y: 2 },
            bb: { x: 3, y: 4 },
        },
        results: [
            {
                type: 'player',
                name: 'me',
                hp: 100,
                position: { x: 5, y: 6 },
                inventory: {
                    items: [
                        {
                            code: ItemCode.Apple,
                            quantity: 1,
                        }
                    ],
                    money: Currency("₩1,234,567.89")
                }
            },
            {
                type: 'living-entity',
                hp: 120,
                position: { x: 7, y: 8 },
            }
        ],
    }),
    {
        aabb: {
            aa: { x: 1, y: 2 },
            bb: { x: 3, y: 4 },
        },
        results: [
            {
                type: 'player',
                name: 'me',
                hp: 100,
                position: { x: 5, y: 6 },
                inventory: {
                    items: [
                        {
                            code: ItemCode.Apple,
                            quantity: 1,
                        }
                    ],
                    money: "₩1,234,567.89"
                }
            },
            {
                type: 'living-entity',
                hp: 120,
                position: { x: 7, y: 8 },
            }
        ],
    }
)