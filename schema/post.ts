import { RouteShorthandOptions } from "fastify";
import { Type } from "@sinclair/typebox";

export const NormalPostSchema = Type.Any()

export const NormalPostQsSchema = Type.Any()

export const NormalPostOpts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                result: NormalPostSchema
            }
        },
        querystring: {
            payload: NormalPostQsSchema
        }
    }
}