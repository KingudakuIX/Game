import bpy
import os
import math
from PIL import Image

#Constants
camera_anchor = bpy.data.objects['anchor']
spriteSize = bpy.data.scenes['Scene'].render.resolution_x

#Variables
basePath = '/Users/gabriele.bessi/Documents/Gabri/Blender/Output/demo_character'
imageName = 'demo_character'
animations = [
    #{ 'name': 'cast2H', 'startFrame': 1, 'endFrame': 82, 'totalFrame': 10 }
    #{ 'name': 'idle', 'startFrame': 1, 'endFrame': 60, 'totalFrame': 10 }
    { 'name': 'run', 'startFrame': 1, 'endFrame': 22, 'totalFrame': 6 }
    #{ 'name': 'death', 'startFrame': 1, 'endFrame': 60, 'totalFrame': 10 }
]

for animationIndex in range(len(animations)):
    renderPaths = []
    currentAnimation = animations[animationIndex]
    animationName = currentAnimation['name']
    startFrame = currentAnimation['startFrame']
    endFrame = currentAnimation['endFrame']
    totalFrame = currentAnimation['totalFrame']
    animationLength = endFrame - startFrame
    
    for angle in range(0, 360, 45):
      if angle == 0:
         angleDir = "S"
      if angle == 45:
         angleDir = "SE"
      if angle == 90:
         angleDir = "E"
      if angle == 135:
         angleDir = "NE"
      if angle == 180:
         angleDir = "N"
      if angle == 225:
         angleDir = "NW"
      if angle == 270:
         angleDir = "W"
      if angle == 315:
         angleDir = "SW"
      camera_anchor.rotation_euler[2] = math.radians(angle)
      file = os.path.join(basePath, imageName + '_' + angleDir)
      renderPaths.append(file)
      
      counter = 0
      for frame in range(startFrame, endFrame, round(animationLength / totalFrame)): 
         bpy.context.scene.frame_current = startFrame + frame
         bpy.context.scene.render.filepath = file + str(counter)
         counter = counter + 1
         bpy.ops.render.render(write_still=True)
    
    camera_anchor.rotation_euler[2] = 0
    # Load previously created frame images to stick them together
    spriteSheet = Image.new('RGBA', (spriteSize * totalFrame, spriteSize * len(renderPaths)))
    for row in range(len(renderPaths)):
      for col in range(totalFrame): 
        imagePath = renderPaths[row] + str(col) + '.png'
        image = Image.open(imagePath)
        
        spriteSheet.paste(image, (spriteSize * col, spriteSize * row))
        os.remove(imagePath)
    spriteSheet.save(basePath + '/' + animationName + '.png')
