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

#
# Prepare dependencies.
#
mkdir -p dependencies/electron-v22.1.0-linux-x64
cd dependencies/electron-v22.1.0-linux-x64
wget -c https://github.com/electron/electron/releases/download/v22.1.0/electron-v22.1.0-linux-x64.zip
unzip electron-v22.1.0-linux-x64.zip
rm -rf electron-v22.1.0-linux-x64.zip
cd ../../

#
# Prepare directories and files.
#
mkdir -p data/electron


