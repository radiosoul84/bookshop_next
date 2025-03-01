import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const body = await req.json();

  const email = body.email;
  const password = body.password;

  function emailValidator(email: string): boolean {
    return EMAIL_REGEXP.test(email);
  }

  function passwordValidator(password: string): boolean {
    if (6 > password.length) {
      return false;
    } else {
      if (9 < password.length) {
        return false;
      } else {
        return /[^\s]/gim.test(password);
      }
    }
  }

  const emailValidationResult = emailValidator(email);
  const passwordValidationResult = passwordValidator(password);

  if (!passwordValidationResult) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  } else if (!emailValidationResult) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  } else {
    return NextResponse.json( {status: 200});
  }
}
