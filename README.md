# In-Memory File System

Welcome to the [Project Initial](https://github.com/iamakl/Project-Initial)</br>
[FORMAL DOCUMENTATION LINK](https://github.com/iamakl/Project-Initial)

This project implements a basic in-memory file system in JavaScript (Node.js). It simulates fundamental file system functionalities, utilizing objects to represent the file system structure and supporting operations like creating directories, files, moving, copying, and deleting.

## Implementation Details

### Data Structures:
- The primary data structure used is an **object** to represent the file system.
- Each directory is represented as an object with keys as file/directory names and values as objects containing type and content information.
- Each file is represented as an object containing type and content information.

### File System Operations:
- `mkdir`: Creates a new directory.
- `cd`: Changes the current directory.
  - Support navigating to the parent directory using `..`
  - Moving to the root directory using `/`
  - Navigating to a specified absolute path.
- `ls`: Lists the contents of the current or specified directory.
- `grep`: Searches for a specified pattern in a file (bonus functionality).
- `cat`: Displays the contents of a file.
- `touch`: Creates a new empty file.
- `echo`: Writes text to a file.
- `mv`: Moves a file or directory to another location.
- `cp`: Copies a file or directory to another location.
- `rm`: Removes a file or directory.
- **`pwd`: Prints the full name (the full path) of the current/working directory (EXTRA FUNCTIONALITY ADDED)**

### Design Decisions:

- This code focuses on providing a basic understanding of file system operations in a **JavaScript (Node.js)** environment.
- **Composite Design Pattern** has been used here where we can treat the whole collection of objects the same way you would treat any of the individual objects in the collection.
- It uses **objects** for efficiency and simplicity in representing directories and files.

![Flowchart Illustrating the File System Design](https://miro.medium.com/v2/resize:fit:722/1*omT9rBM02S1Em3xx-caM4Q.png)

## Setup Instructions:

### Requirements:

1. **Node.js:**
Ensure that Node.js v17.4.0(or newer) is installed on your local machine. You can download it from the official website: [Node.js Downloads](https://nodejs.org/)
2. **Verify Installation:**
Open a terminal or command prompt and run the following commands to verify that Node.js and npm (Node Package Manager) are installed:

```bash
node -v
npm -v
```

You should see version numbers for Node.js and npm.

### Running the JavaScript Code:

1. To open and use the code from the GitHub repository, you can follow these steps:
- **Clone the Repository:**
Open your terminal or command prompt and run the following command to clone the repository to your local machine:

```bash
git clone https://github.com/iamakl/Project-Initial.git
```

- **Navigate to the Project Directory:**
Change your current working directory to the cloned project folder:
    
    ```bash
    cd Project-Initial
    ```
    
1. **Open Terminal:**
Open a terminal or command prompt in the directory where you cloned the Github repository.
2. **Run the Script:**
Execute the main JavaScript file (assuming `FileSystem.js` is the main file) using Node.js:

```bash
node Filesystem.js
```

- This command starts the in-memory file system shell, allowing you to interact with the file system.
1. **Interact with the File System:**
Once the shell is running, you can use the provided commands to interact with the file system.
2. **Exit the Script:**
To exit the script, type `exit` and press Enter. This will exit the in-memory file system shell.





### Time Complexity Analysis

1. **Insertions/Deletions:**
    - **Time Complexity:** O(1)
    - **Explanation:** JavaScript objects typically have constant time complexity for lookup, insertion, and deletion operations.

2. **Path Manipulation:**
    - **Time Complexity:** O(N), where N is the length of the path being manipulated.
    - **Explanation:** Path manipulation operations use string concatenation and regular expressions. The time complexity depends on the length of the paths being manipulated.

3. **Command Processing:**
    - **Time Complexity:** O(1) to O(N), depending on the specific operation.
    - **Explanation:** Most operations involve dictionary lookups or manipulations, which are O(1). However, operations like listing directory contents may take O(N) time, where N is the size of the specific directory or file involved.

