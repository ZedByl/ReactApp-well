export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены некорректно";
        case "EMAIL_EXISTS":
            return "Email или пароль введены некорректно";
        default:
            return "Слишком много попыток входа. Попробуйте позднее";
    }
}
