import type { Request, Response } from "express";
import db from "../db.js";

// add user
export async function register(
  request: Request,
  response: Response,
): Promise<Response> {
  try {
    // fields
    const {
      profileUrl = "",
      location: { city, country },
      password,
      role = "renter",
    } = request.body;
    let { firstname, lastname, email } = request.body;
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim().toLowerCase();

    // validations
    if (!firstname || !lastname || !email || !city || !country || !password)
      return response
        .status(400)
        .json({ success: false, message: "All fields are required" });

    // create collection and document
    const documentRef = await db.collection("users").add({
      profileUrl,
      firstname,
      lastname,
      email,
      location: {
        city,
        country,
      },
      password,
      role,
      status: "active",
    });
    const user = await documentRef.get();

    if (!user.exists)
      return response
        .status(404)
        .json({ success: false, message: "No user found" });
    const data = user.data();
    if (!data) return response.status(404).json({ message: "No data" });

    const { password: _, ...safeUser } = data;
    return response
      .status(201)
      .json({ success: true, message: "User created", user: safeUser });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ success: false, message: "Server Internal Error" });
  }
}
