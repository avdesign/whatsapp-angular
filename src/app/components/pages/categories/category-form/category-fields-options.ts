import { FieldsOptions } from "../../../../common/fields-options";


const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 30
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default fieldsOptions;