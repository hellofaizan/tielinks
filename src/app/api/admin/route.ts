import { USERROLE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    const role = USERROLE.ADMIN;

    if (role === USERROLE.ADMIN) {
        return new NextResponse(null, { status: 200 });
    }
    
    return new NextResponse(null, { status: 403 });
}