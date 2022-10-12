import {
    required as requiredVuelidate,
    helpers,

} from "@vuelidate/validators";

const required = helpers.withMessage(
    "This field cannot be empty",
    requiredVuelidate
);


const GLOBAL_CONFIG = {
    $autoDirty: false,
};
export { required, GLOBAL_CONFIG };
