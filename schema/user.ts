import { Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

export const UserSchema = Type.Array(
    Type.Object({
      firstName: Type.String(),
      lastName: Type.String(),
      email: Type.String(),
      password: Type.String()
    })
);

export const UserResponseOpts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        result: UserSchema
      }
    }
  }
}