from ursina import *
import subprocess
import sys
import os

app = Ursina()

# --- Window Setup ---
window.title = 'Prajakavach Quest'
window.borderless = False
window.fullscreen = False
window.exit_button.visible = True
window.fps_counter.enabled = False
window.color = color.rgb(30, 35, 50)  # Darker background

# --- Indian Flag Background (Tri-color gradient) ---
# Saffron top section
saffron_bg = Entity(
    model='quad', 
    scale=(120, 40), 
    position=(0, 20, 1),
    color=color.rgb(255, 153, 51)  # Saffron
)

# White middle section
white_bg = Entity(
    model='quad', 
    scale=(120, 40), 
    position=(0, 0, 1),
    color=color.rgb(255, 255, 255)  # White
)

# Green bottom section
green_bg = Entity(
    model='quad', 
    scale=(120, 40), 
    position=(0, -20, 1),
    color=color.rgb(19, 136, 8)  # Green
)

# Semi-transparent overlay for better text readability
overlay = Entity(
    model='quad', 
    scale=(100, 100), 
    color=color.rgba(0, 0, 0, 0.3),  # Semi-transparent black
    z=0.5
)

# --- Ashoka Chakra Symbol (simplified as a circle with spokes) ---
chakra = Entity(
    model='circle',
    scale=3,
    position=(0, 0, 0.4),
    color=color.rgb(0, 0, 139)  # Navy blue
)

# Add spokes to chakra (simplified representation)
for i in range(24):
    angle = i * (360 / 24)
    spoke = Entity(
        model='cube',
        scale=(0.1, 1.5, 0.1),
        position=(0, 0, 0.3),
        rotation_z=angle,
        color=color.rgb(0, 0, 139),
        parent=chakra
    )

# --- Professional Heading ---
# Main heading with elegant styling
heading = Text(
    text='🛡️ PRAJAKAVACH QUEST 🛡️',
    position=(0, 0.45), 
    origin=(0, 0), 
    scale=2.8, 
    color=color.rgb(255, 215, 0),  # Gold color
    font='VeraMono.ttf'
)

# Subtitle
subtitle = Text(
    text='Disaster Preparedness & Safety Training',
    position=(0, 0.35), 
    origin=(0, 0), 
    scale=1.2, 
    color=color.rgb(255, 255, 255)
)

# Tagline in Hindi and English
tagline = Text(
    text='सुरक्षा हमारा लक्ष्य • Safety is Our Goal',
    position=(0, 0.28), 
    origin=(0, 0), 
    scale=0.9, 
    color=color.rgb(255, 153, 51)
)

# --- Function to launch each simulation ---
def launch_game(script_name):
    script_path = os.path.join(os.path.dirname(__file__), script_name)
    subprocess.Popen([sys.executable, script_path])

def quit_game():
    application.quit()

# --- Enhanced Button Style ---
def create_button(text, pos, primary_color, icon_text="", script_name=None, quit_btn=False):
    # Button container for shadow effect
    shadow = Entity(
        model='cube',
        scale=(0.38, 0.14, 0.02),
        position=(pos[0] + 0.01, pos[1] - 0.01, 0.2),
        color=color.rgb(0, 0, 0, a=0.3)
    )
    
    if quit_btn:
        btn = Button(
            text=f'{icon_text} {text}',
            position=pos,
            scale=(0.4, 0.13),
            color=primary_color,
            highlight_color=color.light_gray,
            pressed_color=color.gray,
            radius=0.08,
            on_click=quit_game,
            text_color=color.white,
            text_size=1.2
        )
    else:
        btn = Button(
            text=f'{icon_text} {text}',
            position=pos,
            scale=(0.4, 0.13),
            color=primary_color,
            highlight_color=color.light_gray,
            pressed_color=color.gray,
            radius=0.08,
            on_click=lambda: launch_game(script_name),
            text_color=color.white,
            text_size=1.2
        )
    
    return btn

# --- Professional Buttons with Icons ---
Button_list = [
    create_button('FLOOD SIMULATION', (0, 0.12), color.rgb(30, 144, 255), '🌊', 'floods.py'),
    create_button('EARTHQUAKE DRILL', (0, -0.03), color.rgb(255, 140, 0), '🏠', 'earthquake.py'),
    create_button('HEATWAVE SAFETY', (0, -0.18), color.rgb(220, 20, 60), '☀️', 'heatwave.py'),
    create_button('DROUGHT AWARENESS', (0, -0.33), color.rgb(139, 69, 19), '🏜️', 'drought.py'),
    create_button('EXIT APPLICATION', (0, -0.48), color.rgb(105, 105, 105), '❌', quit_btn=True)
]

# --- Additional UI Elements ---
# Version info
version_text = Text(
    text='Version 2.0 | Made in India 🇮🇳',
    position=(-0.85, -0.45),
    origin=(0, 0),
    scale=0.7,
    color=color.white
)

# Instructions
instruction_text = Text(
    text='Select a disaster scenario to begin your training journey',
    position=(0, -0.58),
    origin=(0, 0),
    scale=1,
    color=color.rgb(255, 255, 255)
)

# Footer with national motto
footer_text = Text(
    text='सत्यमेव जयते • Truth Alone Triumphs',
    position=(0, -0.65),
    origin=(0, 0),
    scale=0.8,
    color=color.rgb(255, 215, 0)
)

# --- Subtle Animation ---
def update():
    # Gentle floating animation for the chakra
    chakra.rotation_z += 20 * time.dt
    
    # Subtle glow effect for heading
    heading.color = color.rgb(255, 215 + 40 * math.sin(time.time() * 2), 0)

# --- Ambient Sound (optional - uncomment if you have the file) ---
# ambient_sound = Audio('ambient_india.wav', loop=True, autoplay=True, volume=0.3)

# --- Keyboard shortcuts ---
def input(key):
    if key == '1':
        launch_game('floods.py')
    elif key == '2':
        launch_game('earthquake.py')
    elif key == '3':
        launch_game('heatwave.py')
    elif key == '4':
        launch_game('drought.py')
    elif key == 'escape':
        quit_game()

app.run()