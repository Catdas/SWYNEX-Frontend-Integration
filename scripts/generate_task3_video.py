import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio

WIDTH = 1920
HEIGHT = 1080
FPS = 24

OUTPUT_VIDEO = r"H:\swynex\SWYNEX-Frontend-Integration\SWYNEX_Task3_Frontend_Integration_Demo.mp4"

try:
    font_large_title = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 68)
    font_title = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 46)
    font_subtitle = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 32)
    font_body = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 26)
    font_small = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 22)
    font_mono = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 24)
    font_mono_small = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 20)
    font_badge = ImageFont.truetype(r"C:\Windows\Fonts\segoeui.ttf", 20)
except Exception:
    font_large_title = font_title = font_subtitle = font_body = font_small = font_mono = font_mono_small = font_badge = ImageFont.load_default()

def draw_header(draw, title_text, step_text=""):
    draw.rectangle([(0, 0), (WIDTH, 110)], fill=(13, 19, 33))
    draw.line([(0, 110), (WIDTH, 110)], fill=(16, 185, 129), width=3)
    
    draw.rounded_rectangle([(70, 32), (240, 78)], radius=8, fill=(16, 185, 129))
    draw.text((88, 42), "SWYNEX", fill=(255, 255, 255), font=font_subtitle)
    
    draw.text((270, 44), "Task 3: Frontend Integration & State Resilience", fill=(203, 213, 225), font=font_body)
    
    if step_text:
        draw.rounded_rectangle([(WIDTH - 380, 32), (WIDTH - 70, 78)], radius=8, fill=(30, 41, 59), outline=(71, 85, 105), width=1)
        draw.text((WIDTH - 360, 44), step_text, fill=(52, 211, 153), font=font_small)

def draw_footer(draw, progress=0.0):
    draw.rectangle([(0, HEIGHT - 70), (WIDTH, HEIGHT)], fill=(13, 19, 33))
    draw.line([(0, HEIGHT - 70), (WIDTH, HEIGHT - 70)], fill=(30, 41, 59), width=1)
    
    draw.text((70, HEIGHT - 48), "Intern: Tharun M.  |  Repository: github.com/Catdas/SWYNEX-Frontend-Integration", fill=(148, 163, 184), font=font_small)
    draw.text((WIDTH - 420, HEIGHT - 48), "LinkedIn Submission Video Demo", fill=(52, 211, 153), font=font_small)
    
    bar_width = int(WIDTH * progress)
    if bar_width > 0:
        draw.rectangle([(0, HEIGHT - 6), (bar_width, HEIGHT)], fill=(16, 185, 129))

def render_frame_scene1(t, duration):
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Title Scene", "TASK 3 OVERVIEW")
    
    card_box = [(260, 200), (WIDTH - 260, HEIGHT - 180)]
    draw.rounded_rectangle(card_box, radius=24, fill=(17, 24, 39), outline=(16, 185, 129), width=2)
    
    draw.rounded_rectangle([(320, 260), (740, 310)], radius=25, fill=(6, 95, 70), outline=(52, 211, 153), width=1)
    draw.text((345, 272), "SWYNEX TECHNOLOGIES INTERNSHIP", fill=(167, 243, 208), font=font_badge)
    
    draw.text((320, 340), "Frontend API Integration", fill=(255, 255, 255), font=font_large_title)
    draw.text((320, 440), "React 18 • TypeScript • Skeleton Loading • Error Boundaries • Optimistic UI", fill=(148, 163, 184), font=font_subtitle)
    
    cards = [
        ("REST API Client", "Connected to /api/v1/tasks endpoints with full CRUD", (59, 130, 246)),
        ("Loading Skeletons", "Pulsing column & card placeholders preventing shift", (16, 185, 129)),
        ("Error Recovery", "Retriable network banners, Zod alerts & toast popups", (239, 68, 68))
    ]
    
    for idx, (title, desc, color) in enumerate(cards):
        cx1 = 320 + idx * 430
        cx2 = cx1 + 400
        cy1 = 530
        cy2 = 720
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=16, fill=(24, 33, 54), outline=color, width=2)
        draw.text((cx1 + 25, cy1 + 30), title, fill=(255, 255, 255), font=font_body)
        words = desc.split(" ")
        line1 = " ".join(words[:4])
        line2 = " ".join(words[4:])
        draw.text((cx1 + 25, cy1 + 80), line1, fill=(203, 213, 225), font=font_small)
        draw.text((cx1 + 25, cy1 + 115), line2, fill=(148, 163, 184), font=font_small)
    
    draw_footer(draw, progress=t / 38.0)
    return img

def render_frame_scene2(t, duration):
    # Scene 2: API Client Integration
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "API Client Architecture", "01 / REST INTEGRATION")
    
    draw.rounded_rectangle([(140, 180), (1780, 860)], radius=20, fill=(18, 26, 43), outline=(59, 130, 246), width=2)
    draw.text((180, 220), "Type-Safe RESTful Client Layer (/src/api/taskApi.ts)", fill=(255, 255, 255), font=font_title)
    
    methods = [
        ("TaskApi.getTasks(filters)", "GET  /api/v1/tasks?priority=HIGH&search=...", "Live query filtering & pagination metadata", (59, 130, 246)),
        ("TaskApi.createTask(dto)", "POST /api/v1/tasks", "Payload validation & instant optimistic insertion", (16, 185, 129)),
        ("TaskApi.patchTask(id, dto)", "PATCH/api/v1/tasks/:id", "Swimlane stage progression & priority updating", (245, 158, 11)),
        ("TaskApi.deleteTask(id)", "DELETE /api/v1/tasks/:id", "Immediate removal with optimistic UI rollback", (239, 68, 68))
    ]
    
    for idx, (m_call, m_end, m_desc, m_col) in enumerate(methods):
        my = 300 + idx * 125
        draw.rounded_rectangle([(180, my), (1740, my + 95)], radius=12, fill=(24, 33, 54), outline=m_col, width=1)
        draw.text((210, my + 15), m_call, fill=(255, 255, 255), font=font_body)
        draw.text((210, my + 55), f"{m_end}  •  {m_desc}", fill=(148, 163, 184), font=font_mono_small)
        
    draw_footer(draw, progress=(6.0 + t) / 38.0)
    return img

def render_frame_scene3(t, duration):
    # Scene 3: Loading States (Skeleton Loaders)
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Loading States", "02 / SKELETON SCREENS")
    
    draw.rounded_rectangle([(140, 180), (1780, 860)], radius=20, fill=(18, 26, 43), outline=(16, 185, 129), width=2)
    draw.text((180, 220), "Zero-Layout-Shift Animated Skeleton Screens", fill=(255, 255, 255), font=font_title)
    draw.text((180, 275), "Pulsing structural placeholders mimic the 5-column Kanban layout during async fetch calls.", fill=(148, 163, 184), font=font_subtitle)
    
    # Draw simulated 4 skeleton columns
    for col_idx in range(4):
        cx1 = 180 + col_idx * 390
        cx2 = cx1 + 360
        cy1 = 340
        cy2 = 820
        draw.rounded_rectangle([(cx1, cy1), (cx2, cy2)], radius=16, fill=(15, 23, 42), outline=(51, 65, 85), width=1)
        
        # Column title skeleton
        draw.rounded_rectangle([(cx1 + 20, cy1 + 20), (cx1 + 160, cy1 + 45)], radius=6, fill=(30, 41, 59))
        
        # 2 Card skeletons in each column
        for c_idx in range(2):
            k_y1 = cy1 + 70 + c_idx * 180
            k_y2 = k_y1 + 150
            draw.rounded_rectangle([(cx1 + 20, k_y1), (cx2 - 20, k_y2)], radius=12, fill=(24, 33, 54), outline=(71, 85, 105), width=1)
            # Lines inside card
            draw.rounded_rectangle([(cx1 + 35, k_y1 + 20), (cx2 - 80, k_y1 + 38)], radius=4, fill=(51, 65, 85))
            draw.rounded_rectangle([(cx1 + 35, k_y1 + 52), (cx2 - 120, k_y1 + 68)], radius=4, fill=(30, 41, 59))
            draw.rounded_rectangle([(cx1 + 35, k_y1 + 105), (cx1 + 110, k_y1 + 125)], radius=6, fill=(51, 65, 85))
            draw.ellipse([(cx2 - 60, k_y1 + 100), (cx2 - 35, k_y1 + 125)], fill=(51, 65, 85))
            
    draw_footer(draw, progress=(12.0 + t) / 38.0)
    return img

def render_frame_scene4(t, duration):
    # Scene 4: Error Handling & Recovery
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Error Handling", "03 / ERROR BOUNDARIES & RECOVERY")
    
    # Left: Network Error Banner
    draw.rounded_rectangle([(140, 180), (940, 860)], radius=20, fill=(23, 23, 35), outline=(239, 68, 68), width=2)
    draw.text((180, 220), "Retriable Error Banner", fill=(254, 202, 202), font=font_title)
    draw.text((180, 275), "Graceful network degradation with single-click retry triggers.", fill=(148, 163, 184), font=font_small)
    
    # Simulated Error Banner UI
    draw.rounded_rectangle([(180, 330), (900, 460)], radius=16, fill=(69, 10, 10), outline=(239, 68, 68), width=1)
    draw.text((210, 355), "⚠️ API Communication Error", fill=(254, 202, 202), font=font_body)
    draw.text((210, 400), "Unable to reach backend at :5000. Operating in offline cache mode.", fill=(252, 165, 165), font=font_small)
    
    draw.rounded_rectangle([(180, 490), (450, 545)], radius=12, fill=(185, 28, 28))
    draw.text((210, 508), "🔄 Retry Connection", fill=(255, 255, 255), font=font_small)
    
    # Right: Form Validation Feedback
    draw.rounded_rectangle([(980, 180), (1780, 860)], radius=20, fill=(18, 26, 43), outline=(245, 158, 11), width=2)
    draw.text((1020, 220), "Zod Schema Feedback", fill=(254, 243, 199), font=font_title)
    draw.text((1020, 275), "Client-side and server-side validation error mapping.", fill=(148, 163, 184), font=font_small)
    
    # Simulated Form Alert
    draw.rounded_rectangle([(1020, 330), (1740, 430)], radius=16, fill=(69, 26, 3), outline=(245, 158, 11), width=1)
    draw.text((1050, 355), "🛑 Title must be at least 3 characters long", fill=(254, 240, 138), font=font_body)
    draw.text((1050, 395), "Rejection returned by backend Zod validation schema.", fill=(253, 230, 138), font=font_small)
    
    # Toast Alert
    draw.rounded_rectangle([(1020, 470), (1740, 560)], radius=16, fill=(15, 23, 42), outline=(16, 185, 129), width=1)
    draw.text((1050, 500), "✅ Task updated successfully (Optimistic UI)", fill=(167, 243, 208), font=font_body)
    
    draw_footer(draw, progress=(20.0 + t) / 38.0)
    return img

def render_frame_scene5(t, duration):
    # Scene 5: Optimistic UI & Kanban Progression
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Optimistic UI", "04 / SWIMLANE STAGES & METRICS")
    
    draw.rounded_rectangle([(140, 180), (1780, 860)], radius=20, fill=(18, 26, 43), outline=(16, 185, 129), width=2)
    draw.text((180, 220), "60 FPS Optimistic Updates & Automated Rollback", fill=(52, 211, 153), font=font_title)
    
    steps = [
        ("1. User Action", "User advances task stage: 'TODO' → 'IN_PROGRESS'", (59, 130, 246)),
        ("2. Instant UI Update", "React state updates instantly with 0ms lag for snappy UX", (16, 185, 129)),
        ("3. Async API Mutation", "Background PATCH /api/v1/tasks/:id payload dispatched", (245, 158, 11)),
        ("4. Error Rollback Guard", "If API fails or disconnects, UI automatically reverts state & shows Toast", (239, 68, 68))
    ]
    
    for idx, (stitle, sdesc, scol) in enumerate(steps):
        sy = 300 + idx * 125
        draw.rounded_rectangle([(180, sy), (1740, sy + 95)], radius=12, fill=(24, 33, 54), outline=scol, width=1)
        draw.text((210, sy + 15), stitle, fill=(255, 255, 255), font=font_body)
        draw.text((210, sy + 55), sdesc, fill=(148, 163, 184), font=font_small)
        
    draw_footer(draw, progress=(28.0 + t) / 38.0)
    return img

def render_frame_scene6(t, duration):
    # Scene 6: Conclusion & GitHub
    img = Image.new("RGB", (WIDTH, HEIGHT), (10, 15, 29))
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Submission Ready", "05 / TASK 3 COMPLETED")
    
    card_box = [(220, 180), (WIDTH - 220, 860)]
    draw.rounded_rectangle(card_box, radius=24, fill=(17, 24, 39), outline=(16, 185, 129), width=3)
    
    draw.rounded_rectangle([(280, 240), (700, 290)], radius=25, fill=(6, 95, 70), outline=(52, 211, 153), width=1)
    draw.text((310, 252), "TASK 3 READY FOR SUBMISSION", fill=(167, 243, 208), font=font_badge)
    
    draw.text((280, 320), "Frontend Integration Finalized", fill=(255, 255, 255), font=font_large_title)
    draw.text((280, 420), "React 18 client, loading skeletons, error resilience, and optimistic updates are live on GitHub.", fill=(148, 163, 184), font=font_subtitle)
    
    draw.rounded_rectangle([(280, 490), (WIDTH - 280, 600)], radius=16, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    draw.text((320, 515), "GitHub Repository URL:", fill=(148, 163, 184), font=font_small)
    draw.text((320, 545), "https://github.com/Catdas/SWYNEX-Frontend-Integration", fill=(52, 211, 153), font=font_title)
    
    draw.text((280, 640), "Company: @SWYNEX Technologies", fill=(255, 255, 255), font=font_body)
    draw.text((280, 690), "Internship Track: Frontend Integration  •  Author: Tharun M.", fill=(203, 213, 225), font=font_small)
    draw.text((280, 740), "#SWYNEX #Internship #FrontendDevelopment #ReactJS #TypeScript #TailwindCSS", fill=(52, 211, 153), font=font_body)
    
    draw_footer(draw, progress=(34.0 + t) / 38.0)
    return img

def main():
    print("Generating Task 3 video frames...")
    
    scenes = [
        (render_frame_scene1, 6.0),
        (render_frame_scene2, 6.0),
        (render_frame_scene3, 8.0),
        (render_frame_scene4, 8.0),
        (render_frame_scene5, 6.0),
        (render_frame_scene6, 4.0),
    ]
    
    total_duration = sum(dur for _, dur in scenes)
    total_frames = int(total_duration * FPS)
    print(f"Total video duration: {total_duration}s ({total_frames} frames at {FPS} FPS)")
    
    writer = imageio.get_writer(
        OUTPUT_VIDEO,
        fps=FPS,
        codec='libx264',
        quality=8,
        macro_block_size=1
    )
    
    current_frame = 0
    for scene_idx, (render_fn, duration) in enumerate(scenes):
        scene_frames = int(duration * FPS)
        print(f"Rendering Scene {scene_idx + 1}/{len(scenes)} ({scene_frames} frames)...")
        for f in range(scene_frames):
            t = f / FPS
            img = render_fn(t, duration)
            writer.append_data(np.array(img))
            current_frame += 1
            if current_frame % 50 == 0:
                print(f"  Progress: {current_frame}/{total_frames} frames ({int(current_frame/total_frames*100)}%)")
                
    writer.close()
    print(f"Video generated successfully at: {OUTPUT_VIDEO}")
    print(f"File size: {os.path.getsize(OUTPUT_VIDEO) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
