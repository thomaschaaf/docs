## Provision backend
Now that your have DataStore persisting data locally, in the next step you'll connect it to the cloud. With a couple of commands, you'll create an AWS AppSync API and configure DataStore to synchronize its data to it.

1. Configure Amplify to manage cloud resources on your behalf. Run `amplify configure`. This step will configure a new AWS user in your account for Amplify.

    ```bash
    amplify configure
    ```

   This command will open up a web browser to the AWS Management Console and guide you through creating a new IAM user. For step-by-step directions to set this up, refer to the [CLI installation guide](~/cli/start/install.md).

1. Next, push your new API to AWS. To do this, **update the ampliyxc.config** and change `push=false` to:
    ```bash
    push=true
    ```

1. **Build your project** (Cmd+b), which should now instruct amplify tools to push your configuration to the backend.

##  Add a subscription
We will now demonstrate how to add a subscription to the application, so that we can receieve any updates to the `Todo` model.
1. To configure your application to use the Amplify API cateogry, open `AppDelegate.swift` and **update the amplify initialization code** to add the API plugin.  The `application(_,didFinishLaunchingWithOptions:)` function should now call `Amplify.add(plugin:)` with a reference to `AWSAPIPlugin`:
  ```swift
  let apiPlugin = AWSAPIPlugin(modelRegistration: AmplifyModels())
  let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
  do {
      try Amplify.add(plugin:apiPlugin)
      try Amplify.add(plugin:dataStorePlugin)
      try Amplify.configure()
      print("Initialized Amplify");
  } catch {
      print("Could not initialize Amplify: \(error)")
  }
  ```

1. Open `ViewController.swift` and **add the following** import statment at the top of the file:
  ```swift
  import Combine
  ```

1. In the same file (`ViewController.swift)`, **add a member variable** in the body of the class:
  ```swift
  var todoSubscription: AnyCancellable?
  ```

1. In the same file (`ViewController.swift`), **add the following** code to the body of the class:
  ```swift
  func subscribeTodos() {
      todoSubscription = Amplify.DataStore.publisher(for: Todo.self)
          .sink(receiveCompletion: { completion in
              print("Subscription has been completed: \(completion)")
          }, receiveValue: { mutationEvent in
              print("Subscription got this value: \(mutationEvent)")
          })
  }
  ```

1.  Finally, in the same file (`ViewController.swift`), remove any existing code you may have in `viewDidLoad()` function, and replace it with **calling the subscribeTodos() function**.  Your viewDidLoad() may look like this now:
  ```swift
  override func viewDidLoad() {
      super.viewDidLoad()
      subscribeTodos()
  }
  ```

1.  **Build and run** the application.  In the console output, you will see that we are making a websocket connection to receieve updates any time there is a mutation to the Todo model.

Since this is the first time you are connecting to API, DataStore will sync any mutations that were previously made offline.  If you have been following the guide, there should be one mutation that is synchronized to the backend has an id of "Build iOS Application".

## Query for mutations using the console

In this seciton we will make a mutation using the app sync console and have our app receive that mutation over the websocket subscription.

1. Open a terminal window in your project's directory. **Execute the command:**
  ```bash
  amplify api console
  ```
  
  When prompted, select **GraphQL**. This will open the AWS AppSync console.
   ```Console
   ? Please select from one of the below mentioned services: (Use arrow keys)
      GraphQL 
   ```

1. Copy and paste the following query:

    ```graphql
    query GetTodos {
        listTodos {
            items {
                id
                name
                description
                _deleted
            }
        }
    }
    ```

1. Press the **play button** to run the query. This will return all of the synchronized Todos:

    ![](~/images/lib/getting-started/ios/set-up-ios-appsync-query.png)

## Create a mutation

1. Synchronization will occur bi-directionally. Create an item in AWS AppSync by copying and pasting the following mutation:

    ```graphql
    mutation CreateTodo {
        createTodo(
            input: {
            name: "Tidy up the office",
            description: "Organize books, vaccuum, take out the trash",
            priority: NORMAL
            }
        ) {
            id,
            name,
            description,
            priority,
            _version,
            _lastChangedAt,
        }
    }
    ```

    ![](~/images/lib/getting-started/ios/set-up-ios-appsync-create.png)

1. In the console output of your app, you should see:

  ```console
  Subscription got this value: MutationEvent(id: "58220B03-6A42-4EB8-9C07-36019783B1BD", modelId: "0a0acfab-1014-4f25-959e-646a97b7013c", modelName: "Todo", json: "{\"id\":\"0a0acfab-1014-4f25-959e-646a97b7013c\",\"name\":\"Tidy up the office\",\"priority\":\"NORMAL\",\"description\":\"Organize books, vaccuum, take out the trash\"}", mutationType: "create", createdAt: 2020-05-14 23:31:04 +0000, version: Optional(1), inProcess: false, graphQLFilterJSON: nil)
  ```