/* eslint-disable indent */
export function validator(data, config) {
    const errors = {};
    function validator(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                statusValidate = !(data.trim() === "");
                break;
            case "isEmail": {
                statusValidate = /^\S+@\S+\.\S+/g.test(data);
                break;
            }
            case "isCapitalSymbol": {
                statusValidate = /[A-Z]+/g.test(data);
                break;
            }
            case "isContainDigit": {
                statusValidate = /\d+/g.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length > config.value;
                break;
            }
            default:
                break;
        }
        if (!statusValidate) return config.message;
    }
    for (const fieldNmae in data) {
        for (const validateMethod in config[fieldNmae]) {
            const error = validator(
                validateMethod,
                data[fieldNmae],
                config[fieldNmae][validateMethod]
            );
            if (error && !errors[fieldNmae]) errors[fieldNmae] = error;
        }
    }
    return errors;
}
