#!/bin/bash

SESSION="dev"

cd backend
sudo systemctl start mysql

# Crear sesión en segundo plano
tmux new-session -d -s $SESSION

# Split horizontal (arriba / abajo)
tmux split-window -v -t $SESSION

# En el panel de abajo correr npm run dev
tmux send-keys -t $SESSION:0.1 "npm run dev" C-m

# Dejar el cursor en el panel de arriba
tmux select-pane -t $SESSION:0.0

# Adjuntarse a la sesión
tmux attach -t $SESSION
