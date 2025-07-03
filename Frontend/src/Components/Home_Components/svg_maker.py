from pathlib import Path
import svgwrite

# Directory path where SVG will be saved
output_dir = Path("/home/abhi/Documents/C01/Super_60/Frontend/src/Components/Home_Components/svg")
output_dir.mkdir(parents=True, exist_ok=True)  # Ensure directory exists

# SVG file name
file_name = "super60_heading.svg"
file_path = output_dir / file_name

# Create the SVG canvas
dwg = svgwrite.Drawing(str(file_path), profile="tiny", size=("1100px", "500px"))

# Define styles
font_family = "Montserrat, sans-serif"
font_size = "70px"  # Bigger size
font_weight = "500"
fill_color = "#000000"  # Black text

# Centered positioning logic
x_pos = "50%"
y_start = 80
line_height = 100

# Lines of text to render
lines = [

    "A Place Where Ideas Evolve,",
    "Skills Sharpen, and",
    "Leaders Rise."
]

# Add each line to the SVG
for i, line in enumerate(lines):
    dwg.add(dwg.text(
        line,
        insert=(x_pos, y_start + i * line_height),
        text_anchor="middle",
        font_size=font_size,
        font_family=font_family,
        font_weight=font_weight,
        fill=fill_color
    ))

# Save the SVG file
dwg.save()

# Optional: print saved file name
print(f"SVG saved to: {file_path}")
