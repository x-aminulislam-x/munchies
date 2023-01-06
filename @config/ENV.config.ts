interface IENV {
  ApiEndPoint: string;
}

export const ENV: IENV = {
  ApiEndPoint: process.env.NEXT_APP_BASE_URL,
};
