const BASE_URL = 'https://famous-signs-behave-124-29-217-243.loca.lt';

export const LOGIN_URL = `${BASE_URL}/api/auth/token/`
export const REGISTER_URL = `${BASE_URL}/api/auth/register`
export const VALIDATE_IF_USER_EXIST_URL = `${BASE_URL}/api/auth/vaildate_email_phone`
export const UPDATE_USER_URL = `${BASE_URL}/api/auth/user`

export const OTP_GENERATE_URL = `${BASE_URL}/api/auth/otp_generate`
export const OTP_VALIDATE_URL = `${BASE_URL}/api/auth/otp_validate`

export const RESET_PASSWORD_REQUEST_URL = `${BASE_URL}/api/auth/password_reset/`
export const RESET_PASSWORD_CONFIRM_URL = `${BASE_URL}/api/auth/password_reset/confirm/`

export const GET_USER_URL = `${BASE_URL}/api/auth/user`

export const GET_ALL_SERVICE_CATEGORY_URL = `${BASE_URL}/api/leads/service_category`

export const SEARCH_VENDORS_URL = `${BASE_URL}/api/auth/vendor_search`

export const LEAD_URL = `${BASE_URL}/api/leads/lead`

export const DOCUMENT_URL = `${BASE_URL}/api/auth/document`
