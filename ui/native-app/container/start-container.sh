#!/bin/bash
# 
# ./start-container.sh "500x400" 10 "thunar" 10001
#

SCREEN="$1"
USER=$(whoami)
GUEST_DISPLAY=":$2"
EXTRA=( -dpi 96 )
REMOTE=

shopt -s extglob
declare -A OPTS

# Prepare the client to run when server will be ready
LAUNCHER="/bin/bash"
TEMPDIR=$(mktemp -d)
FIFO="${TEMPDIR}/fifo"
mkfifo "${FIFO}"
chmod a+r "${FIFO}"
chmod a+x "${TEMPDIR}"
exec 3<>"${FIFO}"

APP="$3"
if [ -n "$REMOTE" ]
then
    DISPLAY=${GUEST_DISPLAY} ssh -fCY ${USER} "sleep 5 && echo \$DISPLAY && unset XAUTHORITY && "${OPTS[@]}" ${APP}"
else
    LAUNCHER="sudo -u ${USER} -b -i bash -c"
    DISPLAY=${GUEST_DISPLAY} ${LAUNCHER} "read DISPLAY < '${FIFO}' && \
                    unset XAUTHORITY && \
                    "${OPTS[@]}" DISPLAY=\":\${DISPLAY}\" $APP"
fi

Xephyr -resizeable -displayfd 3 \
       -sw-cursor -reset -terminate \
       "${GUEST_DISPLAY}" -screen "${SCREEN}" "${EXTRA[@]}" &

sleep 1
rm -rf "${TEMPDIR}"

# wait

x11vnc -display :$2 -rfbport $4


