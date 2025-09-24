from ursina import *
import random
from math import sin

app = Ursina()

# --- Window setup ---
window.title = 'Virtual Disaster Drill - Drought Simulation'
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
AmbientLight(color=color.rgba(150,150,150,0.5))

# --- Ground ---
ground = Entity(
    model='cube',
    scale=(100, 0.1, 100),
    texture='white_cube',
    texture_scale=(100,100),
    collider='box',
    color=color.rgb(150,100,50)  # Dry earth
)

# --- Water Sources ---
water_sources = []
for i in range(3):
    ws = Entity(
        model='sphere',
        scale=0.5,
        color=color.blue,
        position=(random.uniform(-40,40), 0.25, random.uniform(-40,40))
    )
    water_sources.append(ws)

# --- Main Safe Zone (Oasis) ---
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
    color=color.brown,  # Dehydrated look
    scale=(0.5, 1, 0.5),
    position=(-8, 0.5, 0),
)
head = Entity(
    model='sphere',
    color=color.white,
    scale=0.4,
    position=(-8, 1.3, 0)
)


# --- Instructions Text ---
instructions = Text(
    text="Use WASD to move. Find water (blue spheres or green oasis) before dehydration!",
    position=(0, 0.35),
    origin=(0, 0),
    scale=1.5,
    background=True,
    background_color=color.black66
)

# --- Thirst Timer ---
thirst_remaining = 45
timer_text = Text(
    text=f'Thirst Level: {int(thirst_remaining)}',
    position=(0, 0.25),
    origin=(0, 0),
    scale=2,
    background=True,
    background_color=color.black66
)

# --- Hydration Message ---
hydration_message = Text(
    text="",
    position=(0, 0.15),
    origin=(0, 0),
    scale=1.5,
    background=True,
    background_color=color.rgba(0,0,255,0.4)
)

# --- Restart Button ---
def restart():
    global thirst_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y
    base_body_x = -8
    base_body_y = 0.5
    base_head_x = -8
    base_head_y = 1.3
    body.position = (base_body_x, base_body_y, 0)
    head.position = (base_head_x, base_head_y, 0)
    body.visible = True
    head.visible = True
    thirst_remaining = 45
    instructions.text = "Use WASD to move. Find water (blue spheres or green oasis) before dehydration!"
    timer_text.text = f'Thirst Level: {int(thirst_remaining)}'
    timer_text.color = color.white
    game_over = False
    restart_button.visible = False
    for ws in water_sources:
        ws.visible = True

restart_button = Button(text='Restart', position=(0, -0.3), scale=(0.2, 0.1), on_click=restart, visible=False)

game_over = False
hydration_time = 0

# Base positions
base_body_x = -8
base_body_y = 0.5
base_head_x = -8
base_head_y = 1.3
base_safe_x = 8
base_safe_y = 1.5

# --- Update loop ---
def update():
    global thirst_remaining, game_over, base_body_x, base_body_y, base_head_x, base_head_y

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



        # Thirst depletion
        thirst_remaining -= time.dt
        timer_text.text = f'Thirst Level: {int(thirst_remaining)}'
        timer_text.color = color.red if thirst_remaining < 10 else color.white

        # Check water sources
        for ws in water_sources:
            if ws.visible and abs(base_body_x - ws.x) < 1 and abs(base_body_y - ws.y) < 1:
                thirst_remaining = min(thirst_remaining + 10, 45)  # Hydrate
                ws.visible = False
                global hydration_time
                hydration_time = 3  # Show hydration message for 3 seconds
                hydration_message.text = "Hydrated! +10 Thirst"

        # Hydration message timer countdown
        if hydration_time > 0:
            hydration_time -= time.dt
            if hydration_time <= 0:
                hydration_message.text = ""

        # Check if reaches safe zone
        if abs(base_body_x - base_safe_x) < 2 and abs(base_body_y - base_safe_y) < 2:
            instructions.text = "Success! Found Oasis! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True
        elif thirst_remaining <= 0:
            instructions.text = "Dehydrated! Drill Failed! Press R or click Restart to restart."
            body.visible = False
            head.visible = False
            game_over = True
            restart_button.visible = True

    # Restart with R key
    if game_over and held_keys['r']:
        restart()

app.run()
