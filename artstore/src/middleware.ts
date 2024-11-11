export { default } from "next-auth/middleware"

export const config = { matcher: ["/myProfile(/*)?", "/my-products(/.*)?"] }