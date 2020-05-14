
👋 Welcome! In this tutorial, you will:

- Set up an iOS application configured with Amplify
- Create a data model and perist data to Amplify DataStore
- Connect your local data to synchronize to a cloud backend

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 10 or higher
- Install [Xcode](https://developer.apple.com/xcode/downloads/) version 10.2 or later
- Install [CocoaPods](https://cocoapods.org/)

- Install the latest version of the [Amplify CLI](~/cli/cli.md) by running:

    ```bash
    npm install -g @aws-amplify/cli
    ```

## Set up your application

### Create a new iOS application
1.  **Open Xcode.**  From the menu bar, select **"File -> New -> Project..."**

1.  Select **Single View App**, select **Next**
  ![](~/images/lib/getting-started/ios/set-up-ios-select-project-template.png)

1.  Fill in the following for your project:
  * Product Name: **Todo**
  * Langauge: **Swift**
  * **Tap `Next`**

  ![](~/images/lib/getting-started/ios/set-up-ios-studio-configure-your-project.png)

1.  After tapping Next, **select where you would like to save your project**, then **tap Create**.

  You should now have an empty iOS project without Amplify.

### Add Amplify to your application

Amplify for iOS is distribued through Cocoapods as a Pod. In this section, you'll setup cocoa pods and add the required Amplify packages.

1.  Before starting this step, please make sure that please **close Xcode.**

  **Open a terminal** and **change directories to your project**.  For example, if you created your project in the folder `~/Developer`, you can:
  ```bash
  cd ~/Developer/Todo
  ```

1.  In order to initialize your project with the CocoaPods package manager, **execute the command**:
  ```bash
  pod init
  ```

  After doing this, you should see a newly created file called `Podfile`.  This file is used to describe what packages your project depends on.

1.  **Update the file** to include the `Amplify` pod:
  ```
  target 'Todo' do
      use_frameworks!
      pod 'amplify-tools'

      pod 'Amplify'
      pod 'AWSPluginsCore'
      pod 'AmplifyPlugins/AWSAPIPlugin'
      pod 'AmplifyPlugins/AWSDataStorePlugin'
  end
  ```

1.  To download and install the Amplify pod into your project, **execute the command**:
  ```bash
  pod install --repo-update
  ```

1.  After doing this, you should now see file called `Todo.xcworkspace`.  You are required to use this file from now on instead of the .xcodeproj file.  To open your workspace, **execute the command**:
```bash
xed .
```
This should open the newly generated Todo.xcworkspace in Xcode.

1.  **Build your project** in Xcode (Cmd+b).  By adding the `amplify-tools` pod in the step above, building your project will invoke `amplify-tools` which will generate a number of files in your project directory.
  * `amplify` (folder) - Contains a number of configuration files and pre-generated sample files that we will be using in you project
  * `amplifyxc.config` - this configuration file controls the behavior of amplify tools
  * `amplifyconfiguration.json` - this configuration file will be added to your project and shipped with your bundle.  This is required by the amplify libraries.
  * `awsconfiguration.json` - this configuration file will also be added to your poject and shipped with your bundle.  This is also requried by the amplify libraries.
    
You are ready to start building with Amplify! 🎉