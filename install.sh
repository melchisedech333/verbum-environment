#!/bin/bash
#
# IHS - By Melchisedech333 - https://github.com/melchisedech333
#
# Verbum Environment install script.
# Tested on Linux Mint x64.
#

#
# Clone project and prepare directory.
# 
git clone https://github.com/melchisedech333/verbum-environment.git
mv verbum-environment verbum
cd verbum
chmod +x verbum.sh
cd ..

#
# Prepare dependencies.
#
mkdir -p dependencies/electron-v22.1.0-linux-x64
cd dependencies/electron-v22.1.0-linux-x64
wget -c https://github.com/electron/electron/releases/download/v22.1.0/electron-v22.1.0-linux-x64.zip
unzip electron-v22.1.0-linux-x64.zip
rm -rf electron-v22.1.0-linux-x64.zip
cd ../../

mkdir -p dependencies/noVNC-1.4.0
cd dependencies/noVNC-1.4.0
wget -c https://github.com/novnc/noVNC/archive/refs/tags/v1.4.0.zip
unzip v1.4.0.zip
rm -rf v1.4.0.zip
cd noVNC-1.4.0/
mv * ..
cd ..
rm -rf noVNC-1.4.0
cd ../../

#
# Prepare directories and files.
#
mkdir -p data/electron
mkdir -p data/ui


