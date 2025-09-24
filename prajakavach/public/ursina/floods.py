from ursina import *
import random
from math import sin

app = Ursina()

# --- Window setup ---
window.title = 'Virtual Disaster Drill - Flood Simulation'
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

# --- Buildings ---
buildings = []
for i in range(5):
    b = Entity(
        model='cube',
        scale=(2, 4, 2),
        color=color.gray,
        position=(random.uniform(-30,30), 2, random.uniform(-30,30))
    )
    buildings.append(b)

# --- Trees ---
trees = []
for i in range(10):
    t = Entity(
        model='cube',
        scale=(0.5, 3, 0.5),
        color=color.green,
        position=(random.uniform(-40,40), 1.5, random.uniform(-40,40))
    )
    trees.append(t)

# --- Rising Water ---
water = Entity(
    model='cube',
    scale=(100, 0, 100),
    color=color.blue,
    position=(0, 0, 0)
)

# --- Safe Zone (Higher Ground) ---
safe_zone = Entity(
    model='cube',
    scale=(4, 3, 2),
    color=color.lime,
    texture='white_cube',
    position=(8, 2, 0)
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

# --- Debris particles ---
debris = []
for _ in range(100):
    d = Entity(
        model='sphere',
        scale=random.uniform(0.05, 0.2),
        color=color.gray,
        position=(random.uniform(-50,50), random.uniform(0.1,1), random.uniform(-10,10))
    )
    debris.append(d)

# --- Instructions Text ---
instructions = Text(
    text="Use WASD to move. Reach the green safe zone before the flood water rises!",
    position=(0, 0.35),
    origin=(0, 0),
    scale=1.5,
    background=True,
    background_color=color.black66
)

# --- Timer ---
time_remaining = 60  # Longer for flood to rise
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
    global time_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y, water_height
    base_body_x = -8
    base_body_y = 0.5
    base_head_x = -8
    base_head_y = 1.3
    body.position = (base_body_x, base_body_y, 0)
    head.position = (base_head_x, base_head_y, 0)
    body.visible = True
    head.visible = True
    time_remaining = 60
    water.scale_y = 0
    water_height = 0
    instructions.text = "Use WASD to move. Reach the green safe zone before the flood water rises!"
    timer_text.text = f'Time Left: {int(time_remaining)}'
    timer_text.color = color.white
    game_over = False
    restart_button.visible = False

restart_button = Button(text='Restart', position=(0, -0.3), scale=(0.2, 0.1), on_click=restart, visible=False)

game_over = False
water_height = 0

# Base positions
base_body_x = -8
base_body_y = 0.5
base_head_x = -8
base_head_y = 1.3
base_safe_x = 8
base_safe_y = 2

# --- Update loop ---
def update():
    global time_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y, water_height

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

        # Update positions
        body.x = base_body_x
        body.y = base_body_y
        head.x = base_head_x
        head.y = base_head_y
        safe_zone.x = base_safe_x
        safe_zone.y = base_safe_y

        # Flood rising (accelerates over time)
        rise_rate = 0.01 + (60 - time_remaining) / 60 * 0.1
        water_height += rise_rate * time.dt
        water.scale_y = water_height
        water.y = water_height / 2

        # Debris floating
        for d in debris:
            if d.y < water_height:
                d.y = water_height + random.uniform(0, 0.1)

        # Timer countdown
        time_remaining -= time.dt
        timer_text.text = f'Time Left: {int(time_remaining)}'
        timer_text.color = color.red if time_remaining < 10 else color.white

        # Check if drowned
        if base_body_y < water_height:
            instructions.text = "Drowned! Drill Failed! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True
        # Check if reaches safe zone
        elif abs(base_body_x - base_safe_x) < 2 and abs(base_body_y - base_safe_y) < 2:
            instructions.text = "Success! Reached Safe Zone! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True
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