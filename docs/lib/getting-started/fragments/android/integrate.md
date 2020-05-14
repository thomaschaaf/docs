Next you'll use the generated model to create, update, query, and delete data. In this section you'll initialize DataStore, and then manipulate Todo items.

## Configure Amplify and DataStore

First, we'll add the DataStore plugin and configure Amplify. Typically, a good place to do this is in the [`onCreate()`](https://developer.android.com/reference/android/app/Application#onCreate()) method of [Android's `Application` class](https://developer.android.com/reference/android/app/Application). For the purposes of this tutorial, you can place these examples in the `onCreate()` method of the `MainActivity` class.

1. Open `MainActivity` and add the following code to the bottom of the `onCreate()` method:

  <amplify-block-switcher>
  <amplify-block name="Java">
  
  ```java
  try {
      Amplify.addPlugin(new AWSDataStorePlugin());
      Amplify.addPlugin(new AWSApiPlugin());
      Amplify.configure(getApplicationContext());

      Log.i("Tutorial", "Initialized Amplify");
  } catch (AmplifyException e) {
      Log.e("Tutorial", "Could not initialize Amplify", e);
  }
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  try {
      Amplify.addPlugin(new AWSDataStorePlugin())
      Amplify.addPlugin(new AWSApiPlugin())
      Amplify.configure(applicationContext)

      Log.i("Tutorial", "Initialized Amplify")
  } catch (e: AmplifyException) {
      Log.e("Tutorial", "Could not initialize Amplify", e)
  }
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see a log line indicating success:

    ```console
    com.example.todo I/Tutorial: Initialized Amplify
    ```

    To make this easier to find, enter the string **Tutorial** into the search field (denoted by the magnifying glass icon).

## Create a Todo

Next, you'll create a Todo and save it to DataStore.

1. Open `MainActivity` and add the following code to the bottom of the `onCreate()` method:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Todo item = Todo.builder()
          .name("Build Android application")
          .description("Build an Android Application using Amplify")
          .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val item: Todo = Todo.builder()
        .name("Build Android application")
        .description("Build an Android Application using Amplify")
        .build()
  ```

  </amplify-block>
  </amplify-block-switcher>

  This code creates a Todo item with two properties: a name and a description. This is a plain object that isn't stored in DataStore yet.

1. Below that, add the code to save the item to DataStore:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
    Amplify.DataStore.save(
            item,
            success -> Log.i("Tutorial", "Saved item: " + success.item.getName()),
            error -> Log.e("Tutorial", "Could not save item to DataStore", error)
    );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.save(
          item,
          { success -> Log.i("Tutorial", "Saved item: " + success.item.name) },
          { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see an indication that the item was saved successfully:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: Saved item: Build application
  ```

1. Replace the item with a new Todo to save an additional item. Let's change the name and description, and add a priority:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Todo item = Todo.builder()
          .name("Finish quarterly taxes")
          .priority(Priority.HIGH)
          .description("Taxes are due for the quarter next week")
          .build();
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  val item = Todo.builder()
        .name("Finish quarterly taxes")
        .priority(1)
        .description("Taxes are due for the quarter next week")
        .build()
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see an indication that the item was saved successfully:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: Saved item: Finish quarterly taxes
  ```

## Query Todos

Now that you have some data in DataStore, you can run queries to retrieve those records.

1. Edit your `onCreate` method to remove the item creation and save. Your `onCreate()` should only include the code required to initiatize Amplify and not calls to `Todo.builder()` or `Amplify.DataStore.save()`.

1. Below the initialization code, add the following:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Amplify.DataStore.query(
          Todo.class,
          todos -> {
              while (todos.hasNext()) {
                  Todo todo = todos.next();

                  Log.i("Tutorial", "==== Todo ====");
                  Log.i("Tutorial", "Name: " + todo.getName());

                  if (todo.getPriority() != null) {
                      Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
                  }

                  if (todo.getDescription() != null) {
                      Log.i("Tutorial", "Description: " + todo.getDescription());
                  }
              }
          },
          failure -> Log.e("Tutorial", "Could not query DataStore", failure)
  );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.query(
        Todo::class.java,
        { todos ->
            while (todos.hasNext()) {
                val todo = todos.next()
                val name = todo.name;
                val priority: Priority? = todo.priority
                val description: String? = todo.description

                Log.i("Tutorial", "==== Todo ====")
                Log.i("Tutorial", "Name: $name")

                if (priority != null) {
                    Log.i("Tutorial", "Priority: $priority")
                }

                if (description != null) {
                    Log.i("Tutorial", "Description: $description")
                }
            }
        },
        { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

1. Run the application. In logcat, you'll see both items returned:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Build application
  com.example.todo I/Tutorial: Description: Build an Android Application using Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Finish quarterly taxes
  com.example.todo I/Tutorial: Description: Taxes are due for the quarter next week
  com.example.todo I/Tutorial: Priority: HIGH
  ```

1. Queries can also contain predicate filters. These will query for specific objects matching a certain condition.

  The following predicates are supported:

  **Strings**
  
  `eq` `ne` `le` `lt` `ge` `gt` `contains` `notContains` `beginsWith` `between`

  **Numbers**

  `eq` `ne` `le` `lt` `ge` `gt` `between`

  **Lists**

  `contains` `notContains`

  To use a predicate, pass an additional argument into your query. For example, to see all high priority items:

  <amplify-block-switcher>
  <amplify-block name="Java">

  ```java
  Amplify.DataStore.query(
          Todo.class,
          Where.matches(
              Todo.PRIORITY.eq(Priority.HIGH)
          ),
          todos -> {
              while (todos.hasNext()) {
                  Todo todo = todos.next();

                  Log.i("Tutorial", "==== Todo ====");
                  Log.i("Tutorial", "Name: " + todo.getName());

                  if (todo.getPriority() != null) {
                      Log.i("Tutorial", "Priority: " + todo.getPriority().toString());
                  }

                  if (todo.getDescription() != null) {
                      Log.i("Tutorial", "Description: " + todo.getDescription());
                  }
              }
          },
          failure -> Log.e("Tutorial", "Could not query DataStore", failure)
  );
  ```

  </amplify-block>

  <amplify-block name="Kotlin">

    ```kotlin
    Amplify.DataStore.query(
        Todo::class.java,
        Where.matches(
            Todo.PRIORITY.eq(Priority.HIGH)
        ),
        Consumer { todos ->
            while (todos.hasNext()) {
                val todo = todos.next()
                val name = todo.name;
                val priority: Priority? = todo.priority
                val description: String? = todo.description

                Log.i("Tutorial", "==== Todo ====")
                Log.i("Tutorial", "Name: $name")

                if (priority != null) {
                    Log.i("Tutorial", "Priority: $priority")
                }

                if (description != null) {
                    Log.i("Tutorial", "Description: $description")
                }
            }
        },
        Consumer { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
    )
    ```

  </amplify-block>
  </amplify-block-switcher>

  In the above, notice addition of the predicate parameter as the second argument.

1. Run the application. In logcat, you'll see only the high priority item returned:

  ```console
  com.example.todo I/Tutorial: Initialized Amplify
  com.example.todo I/Tutorial: ==== Todo ====
  com.example.todo I/Tutorial: Name: Finish quarterly taxes
  com.example.todo I/Tutorial: Description: Taxes are due for the quarter next week
  com.example.todo I/Tutorial: Priority: HIGH
  ```

## Update a Todo

You may want to change the contents of a record. Below, we'll query for a record, create a copy of it, modify it, and save it back to DataStore. 

1. Edit your `onCreate` method to remove the item creation and save. Your `onCreate()` should only include the code required to initiatize Amplify and not calls to `Todo.builder()` or `Amplify.DataStore.save()`.

1. Below the initialization code, add the following: 

  <amplify-block-switcher>
  <amplify-block name="Java">

    ```java
    Amplify.DataStore.query(
            Todo.class,
            Where.matches(
              Todo.NAME.eq("Finish quarterly taxes")
            ),
            todos -> {
                while (todos.hasNext()) {
                    Todo todo = todos.next();
                    Todo updated = todo.copyOfBuilder()
                            .name("File quarterly taxes")
                            .build();

                    Amplify.DataStore.save(updated,
                            success -> Log.i("Tutorial", "Updated item: " + success.item.getName()),
                            error -> Log.e("Tutorial", "Could not update data in DataStore", error)
                    );
                }
            },
            failure -> Log.e("Tutorial", "Could not query DataStore", failure)
    );
    ```

  </amplify-block>

  <amplify-block name="Kotlin">

    ```kotlin
    Amplify.DataStore.query(
            Todo::class.java,
            Where.matches(
              Todo.NAME.eq("Finish quarterly taxes")
            ),
            Consumer { todos ->
                while (todos.hasNext()) {
                    val todo = todos.next()
                    val updated = todo.copyOfBuilder()
                            .name("File quarterly taxes")
                            .build()
                    Amplify.DataStore.save(updated,
                            { success -> Log.i("Tutorial", "Updated item: " + success.item.name) },
                            { error -> Log.e("Tutorial", "Could not save item to DataStore", error) }
                    )
                }
            },
            Consumer { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
    )
    ```

  </amplify-block>
  </amplify-block-switcher>

    Models in DataStore are immutable, so in order to update you first create a copy of the object, modify its properties, and then save it.

1. Run the application. In logcat, you'll see an indication that the item was updated successfully:

    ```console
    com.example.todo I/Tutorial: Initialized Amplify
    com.example.todo I/Tutorial: Updated item: File quarterly taxes
    ```
  
## Delete a Todo

To round out our CRUD operations, we'll query for a record and delete it from DataStore.

1. Edit your `onCreate` method to remove the item creation and save. Your `onCreate()` should only include the code required to initiatize Amplify and not calls to `Todo.builder()` or `Amplify.DataStore.save()`.

1. Below the initialization code, add the following: 

  <amplify-block-switcher>
  <amplify-block name="Java">

    ```java
    Amplify.DataStore.query(
        Todo.class,
        Where.matches(
          Todo.NAME.eq("File quarterly taxes")
        ),
        todos -> {
            if (todos.hasNext()) {
                Todo todo = todos.next();

                Amplify.DataStore.delete(todo,
                        success -> Log.i("Tutorial", "Deleted item: " + success.item.getName()),
                        error -> Log.e("Tutorial", "Could not delete item", error)
                );
            }
        },
        failure -> Log.e("Tutorial", "Could not query DataStore", failure)
  );
  ```
  </amplify-block>

  <amplify-block name="Kotlin">

  ```kotlin
  Amplify.DataStore.query(
        Todo::class.java,
        Where.matches(
          Todo.NAME.eq("File quarterly taxes")
        ),
        Consumer { todos ->
            if (todos.hasNext()) {
                val todo = todos.next()
                Amplify.DataStore.delete(todo,
                        { success -> Log.i("Tutorial", "Deleted item: " + success.item.name) },
                        { error -> Log.e("Tutorial", "Could not delete item", error) }
                )
            }
        },
        Consumer { failure -> Log.e("Tutorial", "Could not query DataStore", failure) }
  )
  ```

  </amplify-block>
  </amplify-block-switcher>

  1. Run the application. In logcat, you'll see an indication that the item was deleted successfully:

    ```console
    com.example.todo I/Tutorial: Initialized Amplify
    com.example.todo I/Tutorial: Deleted item: File quarterly taxes
    ```