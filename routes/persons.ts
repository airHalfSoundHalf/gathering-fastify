import {
    FastifyBaseLogger,
    FastifyInstance,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault
} from "fastify"
import { Type } from "@sinclair/typebox"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"

import {PersonTable} from "../db/type";

type FastifyTypeBox = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
>

export async function Persons(fastify: FastifyTypeBox): Promise<void> {
    fastify.get('persons', {
        schema: {
            response: {
                200: Type.Array(
                    Type.Object({
                        name: Type.String(),
                        email: Type.String(),
                        age: Type.Number(),
                        gender: Type.Enum({
                            mail: 'mail',
                            woman: 'woman',
                            other: 'other'
                                     })
                    })
                )
            }
        },
        onRequest: async (req, reply) => {
            return reply.send();
        }
    },
        async (_req, reply) => {
        // const persons = await getAllPerson()
        //     await reply.code(200).send(persons)
        })

    fastify.post(
        "/persons",
        {
            schema: {
                body: Type.Object({
                    Name: Type.String(),
                    Age: Type.Number(),
                    Email: Type.String(),
                    Gender: Type.Enum({
                        male: "male",
                        woman: "woman",
                        other: "other"
                    })
                })
            },
            onRequest: async (req) => {
                return req
            }
        },
        async (req, reply) => {
            const { Name, Age, Email, Gender } = req.body
            const data: PersonTable = {
                name: Name,
                age: Age,
                email: Email,
                gender: Gender,
            }

            // const person = await createPerson(data)
            // await reply.code(201).send(person)
        }
    )
}

module.exports = Persons;