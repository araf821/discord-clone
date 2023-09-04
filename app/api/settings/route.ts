import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const profile = await currentProfile();
    const { name } = await req.json();
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get("profileId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!profileId) {
      return new NextResponse("Server ID is missing", { status: 400 });
    }

    if (profileId !== profile.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (name.trim().length < 2) {
      return new NextResponse("Name does not meet character requirements.", {
        status: 400,
      });
    }

    const updatedProfile = await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        name: name.trim(),
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.log("SETTINGS ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
