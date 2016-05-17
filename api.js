YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "DataValidationException",
        "Entity",
        "Field",
        "FieldReducer",
        "MetadataIntegrityException",
        "ReducerException",
        "Store",
        "Validator",
        "ValidatorException",
        "ValidatorReducer"
    ],
    "modules": [
        "Core",
        "Reducers",
        "exceptions",
        "injectable"
    ],
    "allModules": [
        {
            "displayName": "Core",
            "name": "Core",
            "description": "Metadatio store."
        },
        {
            "displayName": "exceptions",
            "name": "exceptions",
            "description": "This exception is thrown whenever there is an error while validating your data."
        },
        {
            "displayName": "injectable",
            "name": "injectable",
            "description": "This reducer is in charge of controlling all actions dispatched to change the validation status for a field."
        },
        {
            "displayName": "Reducers",
            "name": "Reducers"
        }
    ],
    "elements": []
} };
});