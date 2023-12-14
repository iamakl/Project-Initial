class InMemoryFileSystem {
    constructor() {
        this.fs = { '/': { type: 'dir', content: {} } };
        this.currentPath = '/';
    }

    mkdir(directoryName) {
        const newPath = this.joinPaths(this.currentPath, directoryName);
        if (this.fs[newPath]) {
            console.log(`Error: Directory '${directoryName}' already exists.`);
        } else {
            this.fs[newPath] = { type: 'dir', content: {} };
            console.log(`Directory '${directoryName}' created.`);
        }
    }

    cd(directory) {
        if (directory === '/') {
            this.currentPath = '/';
        } else if (directory === '..') {
            if (this.level === 0) {
                console.log("You are in the root directory.");
            } else {
                this.level--;
                const parentDirKey = this.dirname(this.currentPath);
                const parentDir = this.fs[parentDirKey];
                this.currentPath = parentDirKey;
                console.log(`Changed current directory to: ${this.currentPath}`);
            }
        } else if (directory.startsWith('/')) {
            const fullPath = this.joinPaths(this.currentPath, directory);
            if (this.fs[fullPath] && this.fs[fullPath].type === 'dir') {
                this.currentPath = fullPath;
            } else {
                console.log(`Error: Directory '${directory}' not found.`);
            }
        } else {
            const newPath = this.joinPaths(this.currentPath, directory);
            if (this.fs[newPath] && this.fs[newPath].type === 'dir') {
                this.currentPath = newPath;
            } else {
                console.log(`Error: Directory '${directory}' not found.`);
            }
        }
    }
    
    
    

    ls(directory = '.') {
        const targetDirectory = directory === '.' ? this.currentPath : this.joinPaths(this.currentPath, directory);
        const currentDirectory = this.fs[targetDirectory];
    
        if (!currentDirectory || currentDirectory.type !== 'dir') {
            console.log(`Error: Directory '${targetDirectory}' not found.`);
            return;
        }
    
        const contents = Object.keys(currentDirectory.content);
        console.log(`Contents of directory '${targetDirectory}':`);
    
        if (contents.length === 0) {
            console.log('(empty)');
        } else {
            contents.forEach(item => {
                console.log(item);
            });
        }
    }
    

    
    grep(pattern, filePath) {
        // Bonus functionality - Search for a specified pattern in a file
        if (!this.fs[filePath] || this.fs[filePath].type !== 'file') {
            console.log(`Error: File '${filePath}' not found.`);
        } else {
            const content = this.fs[filePath].content;
            const matches = content.match(new RegExp(pattern, 'g')) || [];
            console.log(`Matches in '${filePath}':`);
            matches.forEach(match => console.log(match));
        }
    }

    cat(filePath) {
        if (!this.fs[filePath] || this.fs[filePath].type !== 'file') {
            console.log(`Error: File '${filePath}' not found.`);
        } else {
            const content = this.fs[filePath].content;
            console.log(content);
            return content
        }
    }

    touch(fileName) {
        const newPath = this.joinPaths(this.currentPath, fileName);
        if (this.fs[newPath]) {
            console.log(`Error: File '${fileName}' already exists.`);
        } else {
            this.fs[newPath] = { type: 'file', content: '' };
            console.log(`File '${fileName}' created.`);
        }
    }

    echo(text, filePath) {
        if (!this.fs[filePath] || this.fs[filePath].type !== 'file') {
            console.log(`Error: File '${filePath}' not found.`);
        } else {
            this.fs[filePath].content = text;
            console.log(`Text written to '${filePath}'.`);
        }
    }

    mv(sourcePath, destinationPath) {
        if (!this.fs[sourcePath]) {
            console.log(`Error: Source path '${sourcePath}' not found.`);
        } else if (!this.fs[destinationPath] || this.fs[destinationPath].type !== 'dir') {
            console.log(`Error: Destination path '${destinationPath}' not found.`);
        } else {
            this.fs[destinationPath].content[this.basename(sourcePath)] = this.fs[sourcePath];
            delete this.fs[sourcePath];
            console.log(`Moved '${sourcePath}' to '${destinationPath}'.`);
        }
    }

    cp(sourcePath, destinationPath) {
        if (!this.fs[sourcePath]) {
            console.log(`Error: Source path '${sourcePath}' not found.`);
        } else if (!this.fs[destinationPath] || this.fs[destinationPath].type !== 'dir') {
            console.log(`Error: Destination path '${destinationPath}' not found.`);
        } else {
            const destinationName = this.basename(sourcePath);
            this.fs[destinationPath].content[destinationName] = { ...this.fs[sourcePath] };
            console.log(`Copied '${sourcePath}' to '${destinationPath}'.`);
        }
    }

    pwd() {
        const pwdvNew = this.currentPath.split('/').filter(Boolean).join('/');
        console.log(pwdvNew);
    }
    

    rm(path) {
        if (!this.fs[path]) {
            console.log(`Error: Path '${path}' not found.`);
        } else {
            delete this.fs[path];
            console.log(`Removed '${path}'.`);
        }
    }

    get_current_directory_content() {
        return this.fs[this.currentPath].content;
    }

    run_shell() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.setPrompt(`${this.currentPath}$ `);
        rl.prompt();

        rl.on('line', (line) => {
            const command = line.trim().split(/\s+/);
            const operation = command[0].toLowerCase();
            switch (operation) {
                case 'exit':
                    rl.close();
                    break;
                case 'mkdir':
                    this.mkdir(command[1]);
                    break;
                case 'cd':
                    this.cd(command[1]);
                    break;
                case 'ls':
                    this.ls(command[1]);
                    break;
                case 'grep':
                    this.grep(command[1], command[2]);
                    break;
                case 'cat':
                    this.cat(command[1]);
                    break;
                case 'touch':
                    this.touch(command[1]);
                    break;
                case 'echo':
                    this.echo(command.slice(1).join(' '), command[command.length - 1]);
                    break;
                case 'mv':
                    this.mv(command[1], command[2]);
                    break;
                case 'cp':
                    this.cp(command[1], command[2]);
                    break;
                case 'rm':
                    this.rm(command[1]);
                    break;
                case 'pwd':
                    this.pwd();
                    break;
                    
                default:
                    console.log(`Error: Unknown command '${operation}'.`);
                    break;
            }

            rl.setPrompt(`${this.currentPath}$ `);
            rl.prompt();
        });

        rl.on('close', () => {
            console.log('Exiting in-memory file system shell.');
            process.exit(0);
        });
    }

    joinPaths(path1, path2) {
        return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
    }

    dirname(path) {
        return path.replace(/\/[^/]*$/, '');
    }

    basename(path) {
        return path.replace(/^.*\//, '');
    }
}

if (require.main === module) {
    const fileSystem = new InMemoryFileSystem();
    fileSystem.run_shell();
}

// Export the class for potential module usage
module.exports = InMemoryFileSystem;
