# Node.js FFmpeg Project

This is a Node.js project that leverages FFmpeg for media processing tasks. The application spawns the FFmpeg binary to handle operations such as video/audio conversion, streaming, or manipulation. Follow the instructions below to set up and run the project.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Linux (Ubuntu/Debian)](#linux-ubuntudebian)
  - [macOS](#macos)
  - [Windows](#windows)
- [Setup](#setup)
- [Running the Project](#running-the-project)
- [Scripts](#scripts)

## Prerequisites
- **Node.js**: Version 14.x or higher (LTS recommended).
- **npm**: Comes bundled with Node.js.
- **FFmpeg**: Required for media processing. You must install FFmpeg on your machine as Node.js spawns the FFmpeg binary.

## Installation
### Installing FFmpeg
Follow the instructions for your operating system to install FFmpeg.

#### Linux (Ubuntu/Debian)
1. Update the package list:
   ```bash
   sudo apt update
   ```
2. Install FFmpeg:
   ```bash
   sudo apt install ffmpeg -y
   ```
3. Verify installation:
   ```bash
   ffmpeg -version
   ```

#### macOS (with Homebrew)
1. Install Homebrew if not already installed:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Install FFmpeg:
   ```bash
   brew install ffmpeg
   ```
3. Verify installation:
   ```bash
   ffmpeg -version
   ```

#### Windows
1. Download FFmpeg from the [official website](https://ffmpeg.org/download.html) or [gyan.dev builds](https://www.gyan.dev/ffmpeg/builds/).
2. Extract the downloaded `.zip` file to a location (e.g., `C:\ffmpeg`).
3. Add the `bin` folder (e.g., `C:\ffmpeg\bin`) to your System PATH:
   - Open **Start Menu** → Search for **Environment Variables**.
   - Select **Edit the system environment variables**.
   - In the **System Properties** window, click **Environment Variables**.
   - Under **System Variables**, find **Path**, click **Edit**, and add the path to the `bin` folder.
4. Open a new Command Prompt or PowerShell and verify:
   ```bash
   ffmpeg -version
   ```

**Note**: Once you see FFmpeg version info in your terminal, FFmpeg is correctly installed.

### Installing Project Dependencies
1. Clone this repository:
   ```bash
   git clone https://github.com/SMRPcoder/vidstreams.git
   cd vidstreams
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Setup
Ensure FFmpeg is installed and accessible in your terminal (verified by `ffmpeg -version`). All Node.js scripts in this project assume the FFmpeg binary is available in your system PATH.

## Running the Project
Use the following npm scripts to run or build the project:

- **Start Development Environment**:
  Run the project in development mode with hot-reloading:
  ```bash
  npm run start:dev
  ```

- **Build for Production**:
  Compile the project for production:
  ```bash
  npm run build
  ```

- **Run Production Build**:
  Start the production-ready application:
  ```bash
  npm run start:prod
  ```

## Scripts
The following scripts are available in `package.json`:

| Script            | Description                              |
|-------------------|------------------------------------------|
| `npm run start:dev`  | Runs the app in development mode with hot-reloading. |
| `npm run build`      | Builds the app for production.           |
| `npm run start:prod` | Runs the production build.               |

