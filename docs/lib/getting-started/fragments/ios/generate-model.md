With the basic setup complete, next you will model the data your application will store. Amplify DataStore will use this model to persist data to your local device will be synchronized to a backend API without writing any additional code. These models are specified as [GraphQL](http://graphql.org/) schemas. If you'd like, first [learn more](~/cli/graphql-transformer/overview.md) about GraphQL schemas and data modeling.

1. Open the schema file located at **amplify** > **backend** > **api** > **amplifyDatasource** > **schema.graphql**.  

    Replace the contents of the file with the following schema:

    ```graphql
   enum Priority {
     LOW
     NORMAL
     HIGH
   }

   type Todo @model {
     id: ID!
     name: String!
     priority: Priority
     description: String
   }
    ```

    This schema creates a model called `Todo` with four properties:

    - **id** an auto-generated identifier field for a Todo item
    - **name** a non-optional string field that is the title of the Todo item
    - **priority** an optional enumeration type field that indicates the importance of a Todo item; the value of priority can be only *LOW*, *NORMAL*, or *HIGH*
    - **description** an optional string field that holds more information about a Todo item

1. Next, generate the classes for these models. **Update the amplifyxc.config file** and change `modelgen=false` to:
  ```bash
  modelgen=true
  ```

1. **Build the project** by using the keystroke (Cmd+b).  Doing a build should generate the following swift files:
  ```bash
  $ ls amplify/generated/models/
  AmplifyModels.swift
  Priority.swift
  Todo+Schema.swift
  Todo.swift
  ```

1. Add the `models` to your project by dragging and dropping this folder into Xcode.  This will enable the generated models to be compiled into your project.

  ![](~/images/lib/getting-started/ios/gen-model-ios-drag.png)

  * Enable **Copy items if needed** if not already enabled
  * For "Added folders", have **Create groups" selected
  * For "Add to targets", make sure the app target (**Todo**) is checked

  Click **Finish** to add these files to your project as shown in this screenshot:

  ![](~/images/lib/getting-started/ios/gen-model-ios-copy.png)

1. **Build the project** by using the keystroke (Cmd+b).