import {db} from "@/src/backend/model/db";
import {IParcel} from "@/src/lib/types/zod/Parcel";


export async function createParcel(parcel: IParcel) {
  const object = await db.parcel.create({
    data: parcel
  })
}