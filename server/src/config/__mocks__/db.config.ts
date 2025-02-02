import {PrismaClient} from "@prisma/client"
import {mockDeep} from "vitest-mock-extended"

const prisma = mockDeep<PrismaClient>();

export default prisma