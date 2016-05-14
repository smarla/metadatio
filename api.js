YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Entity",
        "Field",
        "MetadataIntegrityException",
        "Validator",
        "ValidatorException"
    ],
    "modules": [
        "Core",
        "exceptions"
    ],
    "allModules": [
        {
            "displayName": "Core",
            "name": "Core",
            "description": "Entities represent real-world elements, that you need to manage within your app.\nExample entities are _Person_, _Car_, and whatever else you can imagine.\n\nEntities by itself don't contain any particular feature - apart from identification, and grouping -. Whilst some Metadatio modules will extend this objects to enrich its features, at it's core an Entity is basically a container for fields.\n\n## Usage\n\n```\nconst entity = new Entity({\n  name: 'Friend',\n  [label: 'Friend',]\n  [namespace: 'people',]\n  [description: 'description...',]\n  [fields: [...]]\n});\n```\n\n## Entity hierarchy\n\nYou can easily define hierarchy between your entities, by leveraging the {{#crossLink \"Entity/parent:property\"}}parent{{/crossLink}} property.\n\n```\nconst parent = new Entity({ name: 'parent-entity', ... });\nconst child = new Entity({ name: 'child-entity', parent: parent });\n```\n\n## Namespaces\n\nEntities are grouped together via `namespaces`, that shall contain entities dedicated to the same purpose, or that are related among each others.\n\nThe `namespace` is a String set directly to the entity upon creation. If you don't set a namespace, the value `'default'` is used. So if you're only planning to use one namespace you can skip this.\n\n\n## Fields\n\nFields are instances of {{#crossLink \"Field\"}}Field{{/crossLink}}, that you can attach upon entity creation, or at any time, by using the built-in {{#crossLink \"Entity/addField:method\"}}addField{{/crossLink}} method.\n\n## Validation\n\nEntities are provided with a native validation system, to determine whether the values set within an object that should comply with entity specification are valid. Basically, entity validation targets the value for each {{#crossLink \"Field\"}}field{{/crossLink}} within the entity, and launches the {{#crossLink \"Field/validate:method\"}}field's validation system{{/crossLink}}."
        },
        {
            "displayName": "exceptions",
            "name": "exceptions",
            "description": "When you instance Metadatio entities and fields, some data health checks are performed. If in the data you declared to configure your element is corrupt in any way, this exception will be thrown."
        }
    ],
    "elements": [
        "Store"
    ]
} };
});