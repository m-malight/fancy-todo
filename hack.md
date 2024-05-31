# Hosting your Next.js application on Truehost with CI/CD

In today's competitive web development landscape, adopting Continuous Integration (CI) and Continuous Deployment (CD) practices has become essential for maintaining a competitive edge. CI/CD automates the process of testing, validating, and deploying code changes, ensuring that applications remain in a deployable state at all times. This automation not only accelerates the release of new features and bug fixes but also minimizes the risk of human error, leading to more reliable and efficient development workflows.

Next.js, a React framework known for its versatility and powerful features, is particularly well-suited for modern web development. It offers a comprehensive suite of capabilities, including server-side rendering, static site generation, and API routes, making it an excellent choice for building scalable and dynamic web applications.

Truehost, a robust hosting platform, complements Next.js by providing high-performance servers, reliable uptime, and excellent customer support. Hosting your Next.js application on Truehost, combined with the implementation of CI/CD practices, ensures that your development process is seamless and efficient. This article explores the importance of CI/CD for Next.js projects on Truehost and provides a detailed guide on configuring these practices to enhance your development workflow and ensure seamless deployment.

## Importance of CI/CD for Next.js projects on Truehost

### Seamless deployment

Implementing CI/CD practices is essential for achieving seamless deployment of Next.js projects on Truehost. Continuous Integration (CI) ensures that code changes are automatically tested and validated, which helps in identifying issues early in the development process. This leads to more stable builds and reduces the chances of errors reaching the production environment. On the other hand, Continuous Deployment (CD) automates the process of deploying applications, making it possible to release new features and fixes rapidly and reliably. Together, CI/CD practices streamline the entire deployment pipeline, ensuring that your Next.js application runs smoothly on Truehost.

### Automation benefits

Automation is a cornerstone of CI/CD practices, offering numerous benefits for Next.js projects. By automating tasks such as testing, linting, and deployment, developers can focus more on writing code and less on manual processes. Automation not only speeds up the development cycle but also enhances the consistency and quality of the code. For instance, automated testing can catch bugs early, and automated deployments ensure that every change is deployed in a controlled and predictable manner. These automation benefits are particularly valuable when deploying to a hosting platform like Truehost, where efficiency and reliability are paramount.

## Implementing CI/CD pipelines for seamless Next.js deployment on Truehost

To illustrate the process, we will use a simple To-Do application built with Next.js. This example will guide you through setting up Continuous Integration (CI) and Continuous Deployment (CD) pipelines, ensuring seamless deployment on Truehost.

### Setting up your Next.js To-Do project

To initialize our project, we begin by creating a new Next.js project:

```bash
npx create-next-app todo-app
cd todo-app
npm install
```

During installation, choose the following options:

- Use App router
- No ESLint
- No TypeScript
- Don't modify the import alias
- Use Tailwind CSS

Next, we will create the necessary files and folders required for the application UI. Specifically, we'll create a `components` folder and add three files within it: `Options.js`, `PopUp.js`, and `Todo.js`.

After creating these folders and files, our project structure should look like this:

```bash
todo-app/
├── app/
│   ├── favicon.ico
│   ├── global.css
│   ├── layout.js
│   ├── page.js
├── components/
│   ├── Options.js
│   ├── PopUp.js
│   ├── Todo.js
├── node_modules/
├── public/
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
```

Now, let's modify each file to achieve the design and functionality we want for our To-Do application.

`components/Options.js`

This component will handle the options available for each To-Do item, such as editing and deleting tasks.

```jsx
import React from "react";

const Options = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={onEdit} className="text-blue-500">
        Edit
      </button>
      <button onClick={onDelete} className="text-red-500">
        Delete
      </button>
    </div>
  );
};

export default Options;
```

`components/PopUp.js`

This component will display a popup for adding or editing To-Do items.

```jsx
import React, { useState } from "react";

const PopUp = ({ onClose, onSave, initialText = "" }) => {
  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Task:
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
```

`components/Todo.js`

This component serves as the central hub of the application. It connects the other components and manages their state, ensuring seamless functionality and interaction.

```jsx
import React, { useState } from "react";
import Options from "./Options";
import PopUp from "./PopUp";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSave = (text) => {
    if (currentTodo) {
      editTodo(currentTodo.id, text);
      setCurrentTodo(null);
    } else {
      addTodo(text);
    }
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      <button
        onClick={() => setIsEditing(true)}
        className="mb-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded"
          >
            <span>{todo.text}</span>
            <Options
              onEdit={() => {
                setIsEditing(true);
                setCurrentTodo(todo);
              }}
              onDelete={() => deleteTodo(todo.id)}
            />
          </li>
        ))}
      </ul>
      {isEditing && (
        <PopUp
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          initialText={currentTodo ? currentTodo.text : ""}
        />
      )}
    </div>
  );
};

export default Todo;
```

`app/page.js`

This component plays a crucial role in rendering our application components and making them visible within the browser.

```jsx
import Todo from "@/components/Todo";

export default function Home() {
  return <Todo />;
}
```

`app/global.css`
f
This file is responsible for managing all the styles and visual aspects of our application. It ensures a consistent and cohesive look and feel throughout the entire application.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

.remove-scrollbar {
  scrollbar-width: none;
}

.remove-scrollbar::-webkit-scrollbar-thumb {
  width: none;
}
```

### Running the project

To see the application in action, run the following commands in your project directory:

```bash
npm run dev
```

This will start your Next.js development server. You can then view the To-Do application at `http://localhost:3000`. The app should look similar to the image below:

![Todo App](https://hackmd.io/_uploads/HJ-dQ9IVC.png)

### Configuring Continuous Integration (CI)

Continuous Integration (CI) is a crucial practice in modern web development that automates the process of testing and validating code changes. By implementing CI, you can ensure that your Next.js application is always in a deployable state, reducing the risk of introducing errors into your production environment.

One of the most powerful and flexible tools for setting up CI workflows is GitHub Actions. GitHub Actions allows you to automate, customize, and execute your software development workflows directly in your GitHub repository. With GitHub Actions, you can create workflows that lint and test every pull request to your repository or deploy merged pull requests to production.

To get started with GitHub Actions for our To-Do project, we need to create a `.github/workflows` directory in the root folder. Inside this directory, we will define our CI workflow using YAML files. For this project, we will create a `main.yml` file. After this setup, our file structure should look like this:

```bash
todo-app/
├── .github/
│   └── workflows/
│        └── main.yml
├── app/
│   ├── favicon.ico
│   ├── global.css
│   ├── layout.js
│   ├── page.js
├── components/
│   ├── Options.js
│   ├── PopUp.js
│   ├── Todo.js
├── node_modules/
├── public/
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
```

Next, we will edit our `main.yml` file to perform checks when we push our code. In our case, we will check for code linting. Note that this project assumes you have a GitHub account and are using Git for version control.

`.github/workflows/main.yml`

Maintaining code quality is vital for the success of any project. Configuring CI to execute linting ensures that the codebase remains healthy and adheres to defined coding standards.

```yaml
name: Code Formatting
on:
  push:
    branches:
      - "**"

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Run Prettier
        run: npm run format
```

Let's break down this configuration line by line:

- **name: Code Formatting**: This defines the name of the workflow as Code Formatting.
- **on**: Specifies the events that trigger the workflow.

- **push**: The workflow is triggered by a push event.
- **branches**: Specifies that the workflow should run on any branch, indicated by the `**` pattern.

- **jobs**: Groups a set of tasks called jobs that the workflow will run.

- **lint**: This is the name of the job we are defining.

- **runs-on: ubuntu-latest**: Specifies the type of machine that the job will run on, in this case, the latest version of an Ubuntu Linux runner.

- **steps**: Lists a sequence of tasks that the job will perform.

- **name: Checkout code**: This step is named Checkout code.

- **uses: actions/checkout@v2**: Uses the `actions/checkout@v2` action to check out (i.e., retrieve) the repository's code so that subsequent steps can access it.

- **name: Set up Node.js**: This step is named Set up Node.js.

- **uses: actions/setup-node@v2**: Uses the `actions/setup-node@v2` action to install and set up Node.js on the runner.
- **with**: Passes parameters to the action.
- **node-version: '20'**: Specifies that version 20 of Node.js should be installed.

- **name: Install dependencies**: This step is named Install dependencies.

- **run: npm install**: Executes the shell command `npm install`, which installs the project's dependencies defined in the `package.json` file.

- **name: Run Prettier**: This step is named Run Prettier.
- **run: npm run format**: Executes the `npm run format` command, which is typically defined in the `scripts` section of `package.json` to run Prettier for code formatting.

This configuration triggers the CI workflow on every push to any branch, checks out the code, sets up Node.js, installs dependencies, and runs the lint command using Prettier. This setup ensures that the code adheres to coding standards and changes are continuously integrated and validated.

### Setting up Continuous Deployment (CD)

Continuous Deployment (CD) is the practice of automatically deploying every change that passes all stages of your production pipeline to your production environment. By integrating CD into your development process, you can ensure that your Next.js application is always up-to-date and available to users with minimal manual intervention. This not only accelerates the release of new features and bug fixes but also reduces the risk of human error during deployment.

In the context of our To-Do project hosted on Truehost, setting up Continuous Deployment (CD) ensures seamless and efficient deployment of code changes. Truehost integrates with cPanel, simplifying the process of automating deployments directly from your GitHub repository. Below, we'll guide you through activating your cPanel account, connecting your GitHub repository, and configuring deployment automation using a `.cpanel.yml` file. Note that this tutorial assumes you have a web hosting service with Truehost, as cPanel access is required. Without a web hosting service, you will not have access to cPanel. If you need to create a one, follow this link to [Truehost](https://truehost.com/web-hosting/).

- **Activating cPanel account on Truehost:** To activate the cPanel account, log in to your Truehost account and navigate to the cPanel section.

- **Connecting GitHub repository:** Log in to your cPanel account through Truehost. In cPanel, find and click on the Git Version Control feature.

- **Create repository:** Click on Create to set up a new repository. Enter the repository name and the GitHub repository URL (e.g., `https://github.com/yourusername/your-repo.git`) and choose the deployment directory where you want your application to be deployed and click Create for private repositories you need to create a SSH Key click [here](https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-set-up-access-to-private-repositories/) to understand how to create one and its public key to github repository.

### Deployment automation with `.cpanel.yml`

To automate the deployment process using cPanel, we will create a `.cpanel.yml` file in the root of the To-Do app. This file contains the commands that should be executed when new changes are pushed to the repository. After this setup, our file structure should look like this:

```bash
todo-app/
├── .github/
│   └── workflows/
│        └── main.yml
├── app/
│   ├── favicon.ico
│   ├── global.css
│   ├── layout.js
│   ├── page.js
├── components/
│   ├── Options.js
│   ├── PopUp.js
│   ├── Todo.js
├── node_modules/
├── public/
├── .cpanel.yml
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
```

Next, we edit the `.cpanel.yml` file:

`.cpanel.yml`

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/jghjhdff/public_html/
    - /bin/cp -R dist/assets $DEPLOYPATH
    - /bin/cp dist/index.html $DEPLOYPATH
```

Replace the `DEPLOYPATH` with your deployment path.

### Explanation of the `.cpanel.yml` File

- **export DEPLOYPATH**: Sets an environment variable for the deployment path.
- **/bin/cp -R dist/assets $DEPLOYPATH**: Copies the `assets` directory from the `dist` folder to the deployment path specified by `DEPLOYPATH`. The `-R` option tells `cp` to copy directories recursively.
- **/bin/cp dist/index.html $DEPLOYPATH**: Copies the `index.html` file from the `dist` folder to the deployment path specified by `DEPLOYPATH`.

### Final steps

Since our server doesn't have Node.js installed, we need to run the build command on the local machine before pushing it to GitHub:

```bash
npm run build
npm run format
git add .
git commit -m "ci/cd integration"
git push origin main
```

Once you push the changes, GitHub will automatically execute the workflow defined in your `main.yml` file. The GIF below demonstrates GitHub executing the actions:

![CI](#)

To update our server, we need to log in to our cPanel and pull our recent changes from GitHub. Upon pulling the changes, it will automatically execute the tasks in the `.cpanel.yml` file. Once the process is completed, our updates will reflect on our website. The GIF below shows how to pull the changes in cPanel:

![CD](#)

### Conclusion

Implementing CI/CD practices for hosting Next.js projects on Truehost offers numerous advantages, including improved efficiency, scalability, and reliability. Continuous Integration ensures that code changes are consistently tested and validated, leading to stable builds. Continuous Deployment automates the release process, enabling rapid and reliable deployments. Together, CI/CD practices streamline the development workflow, allowing developers to focus on building features rather than managing deployments. Leveraging CI/CD practices is crucial for modern web development, particularly when working with powerful tools like Next.js and hosting platforms like Truehost. By automating testing, validation, and deployment processes, CI/CD enhances the overall development experience, making it possible to deliver high-quality applications quickly and efficiently. Embracing these practices not only improves the deployment process but also contributes to the long-term success and maintainability of your projects.
