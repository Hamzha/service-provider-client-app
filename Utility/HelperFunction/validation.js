function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
const basic_validation = (data, fields) => {
    let has_error = false;
    let error_fields = {};
    fields.forEach(field => {
        if (typeof data[field] == 'string')
            data[field] = data[field].trim();

        if (data[field] == null) {
            error_fields[field] = 'This field is required';
        }
        else if (data[field] == '') {
            has_error = true;
            error_fields[field] = 'This field is required';
        }
    });
    error_fields.has_error = has_error
    return error_fields
}
export const login_validation = (data) => {
    var error = basic_validation(data, ['email', 'password'])
    if (error.has_error)
        return error
    // Validating email
    if (!error.email && !ValidateEmail(data.email)) {
        error.email = 'Email is not valid';
        error.has_error = true;
    }
    return error;
}
export const signup_validation = (data, isValidNumber) => {
    var error = basic_validation(data, ['email', 'password', 'password2', 'phone_number'])

    // Validating email
    if (!error.email && !ValidateEmail(data.email)) {
        error.email = 'Email is not valid';
        error.has_error = true;
    }

    // Validating phonenumber
    if (!error.phone_number && !isValidNumber(data.phone_number)) {
        error.phone_number = 'Phone number is not valid';
        error.has_error = true;
    }

    // validating password
    if (data.password != data.password2) {
        error.password2 = 'Password does not match';
        error.has_error = true;
    }
    return error;
}

export const signup_profile_validation = (data) => {
    var error = basic_validation(data, ['first_name', 'last_name', 'home_address', 'street_address', 'state', 'city', 'zip_code'])
    return error;
}

export const resetPasswordRequestValidation =(data)=>{
    var error = basic_validation(data, ['email'])
    if (error.has_error)
        return error
    // Validating email
    if (!error.email && !ValidateEmail(data.email)) {
        error.email = 'Email is not valid';
        error.has_error = true;
    }
    return error;
}

export const resetPasswordConfirmValidation =(data)=>{
    var error = basic_validation(data, ['password','confirmPassword','otp'])
    if (error.has_error)
        return error
    // Validating password
    if (data.password!=data.confirmPassword) {
        error.password = 'Password did not matched';
        error.has_error = true;
        return error;
    }

    if(data.password && data.password.length<8)
    {
        error.password = 'Password should be atleast 8 characters long';
        error.has_error = true;
    }
    return error;
}


export const update_profile_validation = (data) => {
    var error = basic_validation(data, ['first_name', 'last_name', 'home_address', 'street_address', 'state', 'city', 'zipcode'])
    return error;
}
