#!/bin/bash

SESSION="dev"

sudo systemctl start mysql 

# Crear sesión en segundo plano
tmux new-session -d -s $SESSION

# Split horizontal (arriba / abajo)
tmux split-window -v -t $SESSION
# pane 0.0 = arriba
# pane 0.1 = abajo

# Split vertical SOLO en el pane de arriba
tmux split-window -h -t $SESSION:0.0
# pane 0.2 = arriba-derecha (extra)

# Ejecutar comandos donde querés
tmux send-keys -t $SESSION:0.0 "cd LaBarbeerApp && npm run start" C-m
# tmux send-keys -t $SESSION:0.0 "npm run start" C-m

tmux send-keys -t $SESSION:0.1 "cd backend && npm run dev" C-m
# tmux send-keys -t $SESSION:0.1 "npm run dev" C-m

tmux resize-pane -t $SESSION:0.2 -y 1
# Dejar el cursor en el pane 0.0
tmux select-pane -t $SESSION:0.2

# Adjuntarse a la sesión
tmux attach -t $SESSION
