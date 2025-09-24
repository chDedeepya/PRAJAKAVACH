from ursina import *
import random
from math import sin
import json
import os

app = Ursina()

# --- Window setup ---
window.title = 'Virtual Disaster Drill - Realistic Side View'
window.borderless = False
window.fullscreen = False
window.exit_button.visible = True
window.fps_counter.enabled = True

# --- Camera setup ---
camera.orthographic = True
camera.fov = 25
camera.position = (0, 8, -25)
camera.look_at(Vec3(0, 2, 0))

# --- Lighting ---
DirectionalLight(y=5, z=-5, rotation=(45, -45, 0))
AmbientLight(color=color.rgba(100,100,100,0.5))

# --- Ground ---
ground = Entity(
    model='cube',
    scale=(100, 0.1, 100),
    texture='white_cube',
    texture_scale=(100,100),
    collider='box',
    color=color.rgb(100,150,100)
)

# --- Shelter ---
safe_zone = Entity(
    model='cube',
    scale=(4, 3, 2),
    color=color.lime,
    texture='white_cube',
    position=(8, 1.5, 0)
)
door = Entity(
    model='cube',
    scale=(1, 2, 0.5),
    color=color.brown,
    position=(8, 1, 1)
)

# --- Character ---
body = Entity(
    model='cube',
    color=color.azure,
    scale=(0.5, 1, 0.5),
    position=(-8, 0.5, 0),
)
head = Entity(
    model='sphere',
    color=color.cyan,
    scale=0.4,
    position=(-8, 1.3, 0)
)

# --- Debris particles for earthquake ---
debris = []
for _ in range(300):
    d = Entity(
        model='sphere',
        scale=random.uniform(0.05, 0.2),
        color=color.gray,
        position=(random.uniform(-50,50), random.uniform(5,15), random.uniform(-10,10))
    )
    d.speed = random.uniform(0.05, 0.15)
    debris.append(d)  # append to list

# --- Instructions Text ---
instructions = Text(
    text="Use WASD to move the man. Enter the green shelter before time runs out!",
    position=(0, 0.35),
    origin=(0, 0),
    scale=1.5,
    background=True,
    background_color=color.black66
)

# --- Timer ---
time_remaining = 30
timer_text = Text(
    text=f'Time Left: {int(time_remaining)}',
    position=(0, 0.25),
    origin=(0, 0),
    scale=2,
    background=True,
    background_color=color.black66
)

# --- Restart Button ---
def restart():
    global time_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y
    base_body_x = -8
    base_body_y = 0.5
    base_head_x = -8
    base_head_y = 1.3
    body.position = (base_body_x, base_body_y, 0)
    head.position = (base_head_x, base_head_y, 0)
    body.visible = True
    head.visible = True
    time_remaining = 30
    instructions.text = "Use WASD to move the man. Enter the green shelter before time runs out!"
    timer_text.text = f'Time Left: {int(time_remaining)}'
    timer_text.color = color.white
    game_over = False
    restart_button.visible = False

restart_button = Button(text='Restart', position=(0, -0.3), scale=(0.2, 0.1), on_click=restart, visible=False)

game_over = False

# Base positions
base_body_x = -8
base_body_y = 0.5
base_head_x = -8
base_head_y = 1.3
base_safe_x = 8
base_safe_y = 1.5
base_door_x = 8
base_door_y = 1

# --- Update loop ---
def update():
    global time_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y

    speed = 5 * time.dt

    if not game_over:
        # Man movement
        if held_keys['w']:
            base_body_y += speed
            base_head_y += speed
        if held_keys['s']:
            base_body_y -= speed
            base_head_y -= speed
        if held_keys['a']:
            base_body_x -= speed
            base_head_x -= speed
        if held_keys['d']:
            base_body_x += speed
            base_head_x += speed

        # Prevent going under the ground
        base_body_y = max(base_body_y, 0.5)
        base_head_y = max(base_head_y, 1.3)

        # Earthquake shaking
        offset_y = 0.05 * sin(time.time() * 20)
        offset_x = 0.05 * sin(time.time() * 15)
        rotation_z = 2 * sin(time.time() * 10)

        for entity, bx, by in [(ground,0,0), (safe_zone,base_safe_x,base_safe_y), (door,base_door_x,base_door_y), (body,base_body_x,base_body_y), (head,base_head_x,base_head_y)]:
            entity.x = bx + offset_x
            entity.y = by + offset_y
            entity.rotation_z = rotation_z

        # Debris falling
        for d in debris:
            d.y -= d.speed
            d.x += random.uniform(-0.02,0.02)
            d.z += random.uniform(-0.02,0.02)
            if d.y < 0.1:
                d.y = 0.1

        # Timer countdown
        time_remaining -= time.dt
        timer_text.text = f'Time Left: {int(time_remaining)}'
        timer_text.color = color.red if time_remaining < 10 else color.white

        # Check if Man Enters Shelter
        if abs(base_body_x - base_door_x) < 1.5 and abs(base_body_y - base_door_y) < 1.5:
            instructions.text = "Success! Entered Shelter! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True
            # Update score
            scores_file = 'scores.json'
            try:
                with open(scores_file, 'r') as f:
                    scores = json.load(f)
            except FileNotFoundError:
                scores = {}
            score = 100 + int(time_remaining * 2)
            scores['earthquake'] = scores.get('earthquake', 0) + score
            with open(scores_file, 'w') as f:
                json.dump(scores, f)
        elif time_remaining <= 0:
            instructions.text = "Time's up! Drill Failed! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True

    # Restart with R key
    if game_over and held_keys['r']:
        restart()

app.run()
