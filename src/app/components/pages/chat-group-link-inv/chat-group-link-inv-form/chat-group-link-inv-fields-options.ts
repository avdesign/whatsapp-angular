import { FieldsOptions } from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
    total: {
        id: 'total',
        label: 'Total de convites',
        validationMessage: {
            min: 1
        }
    },
    expires_at: {
        id: 'expires_id',
        label: 'Data de expiração',
        validationMessage: {
        }

    }
};

export default fieldsOptions;