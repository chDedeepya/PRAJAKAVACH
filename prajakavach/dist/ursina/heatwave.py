from ursina import *
import random
from math import sin

app = Ursina()

# --- Window setup ---
window.title = 'Virtual Disaster Drill - Heatwave Simulation'
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
AmbientLight(color=color.rgba(200,150,100,0.5))  # Warmer light

# --- Ground ---
ground = Entity(
    model='cube',
    scale=(100, 0.1, 100),
    texture='white_cube',
    texture_scale=(100,100),
    collider='box',
    color=color.rgb(200,150,100)  # Sandy color
)

# --- Safe Zone (Shade) ---
safe_zone = Entity(
    model='cube',
    scale=(4, 3, 2),
    color=color.green,
    texture='white_cube',
    position=(8, 1.5, 0)
)

# --- Character ---
body = Entity(
    model='cube',
    color=color.red,  # Sweaty look
    scale=(0.5, 1, 0.5),
    position=(-8, 0.5, 0),
)
head = Entity(
    model='sphere',
    color=color.magenta,
    scale=0.4,
    position=(-8, 1.3, 0)
)

# --- Heat waves effect (simple particles) ---
heat_particles = []
for _ in range(50):
    p = Entity(
        model='sphere',
        scale=0.1,
        color=color.yellow,
        position=(random.uniform(-50,50), random.uniform(1,3), random.uniform(-10,10))
    )
    p.speed = random.uniform(0.01, 0.05)
    heat_particles.append(p)

# --- Instructions Text ---
instructions = Text(
    text="Use WASD to move. Find shade (green area) before heat exhaustion!",
    position=(0, 0.35),
    origin=(0, 0),
    scale=1.5,
    background=True,
    background_color=color.black66
)

# --- Heat Timer ---
heat_remaining = 30
timer_text = Text(
    text=f'Heat Resistance: {int(heat_remaining)}',
    position=(0, 0.25),
    origin=(0, 0),
    scale=2,
    background=True,
    background_color=color.black66
)

# --- Restart Button ---
def restart():
    global heat_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y
    base_body_x = -8
    base_body_y = 0.5
    base_head_x = -8
    base_head_y = 1.3
    body.position = (base_body_x, base_body_y, 0)
    head.position = (base_head_x, base_head_y, 0)
    body.visible = True
    head.visible = True
    heat_remaining = 30
    instructions.text = "Use WASD to move. Find shade (green area) before heat exhaustion!"
    timer_text.text = f'Heat Resistance: {int(heat_remaining)}'
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

# --- Update loop ---
def update():
    global heat_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y

    speed = 4 * time.dt  # Slower due to heat

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

        # Heat waves rising
        for p in heat_particles:
            p.y += p.speed
            if p.y > 5:
                p.y = 1

        # Heat exhaustion
        heat_remaining -= time.dt * 1.5  # Faster depletion
        timer_text.text = f'Heat Resistance: {int(heat_remaining)}'
        timer_text.color = color.red if heat_remaining < 10 else color.white

        # Check if reaches safe zone
        if abs(base_body_x - base_safe_x) < 2 and abs(base_body_y - base_safe_y) < 2:
            instructions.text = "Success! Found Shade! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True
        elif heat_remaining <= 0:
            instructions.text = "Heat Exhaustion! Drill Failed! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True

    # Restart with R key
    if game_over and held_keys['r']:
        restart()

app.run()
