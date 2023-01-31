
# Verbum Environment

Tested on Linux Mint x64.

<br>

## <b>Requirements</b>

- Electron v22.1.0 (Stable) [Download](https://github.com/electron/electron/releases/tag/v22.1.0)
- git, wget

<br>

## <b>Install</b>

Go to the directory where you want to install Verbum Environment.

<br>
Example:

```bash
cd ~/
mkdir .verbum-environment
cd .verbum-environment
```

<br>
And run the commands below.

```bash
wget -c https://raw.githubusercontent.com/melchisedech333/verbum-environment/main/install.sh
chmod +x install.sh
./install.sh
```

<br>
After the installation is successful, run the <b>verbum.sh</b> script (The file is inside the folder called <b>verbum</b>).

```bash
cd verbum
chmod +x verbum.sh
./verbum.sh
```

<br>

## <b>Project structure</b>

<b>Scripts:</b>

- <b>install.sh</b>: installation script.
- <b>verbum.sh</b>: Initializes the Verbum Environment.

<br>
<b>Files:</b>

- <b>package.json</b>: Configuration file (Electron).
- <b>verbum.js</b>: Main file (Electron).
- <b>ui-interface.js</b>: Interface control (UI).

<br>
<b>Directories:</b>

- <b>ui</b>: user interface (Electron).
- <b>interface</b>: system interface.

<br>
<b>After installation:</b>

- <b>verbum/*</b>: Verbum Environment.
- <b>dependencies/*</b>: All necessary dependencies.
- <b>data/electron</b>: Electron temporary files.
- <b>data/ui</b>: UI files.

<br>

## <b>Codes and projects that helped me create the Verbum Environment</b>

- Sylvain Leroux, with its scripts that allow you to run applications on Xephyr ([View gists scripts](https://gist.github.com/s-leroux/d1d2f730467857fa3afe)). It helped me a lot in building the Native-App module (Xephyr + noVNC), which makes it possible to open and control native programs through the web interface (Electron). 


