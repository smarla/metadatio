YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Entity",
        "Field",
        "FieldReducer",
        "MetadataIntegrityException",
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
            "description": "When you instance Metadatio entities and fields, some data health checks are performed. If in the data you declared to configure your element is corrupt in any way, this exception will be thrown."
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