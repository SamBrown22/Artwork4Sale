export { default } from "next-auth/middleware"

export const config = { matcher: ["/myProfile(/*)?", "/add-product"] }