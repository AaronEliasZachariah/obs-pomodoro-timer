# OBS Pomodoro Timer

A transparent overlay timer for OBS streaming with audio notifications.

## Features
- 25-minute focus sessions
- 5-minute short breaks
- 15-minute long break after 4 sessions
- Audio notifications for session transitions
- Transparent background for streaming overlay

## Setup Options

### Option 1: Simple OBS Audio Capture (Recommended - Try This First!)

If OBS "Monitor and Output" works for you, use this simple version:

1. **Add Browser Source in OBS:**
   - Right-click in Sources → Add → Browser Source
   - Name it "Pomodoro Timer"
   - Check "Local file" and select `pomodoro-simple.html`
   - Set width/height to your desired size (e.g., 800x400)
   - Check "Shutdown source when not visible"
   - **Important:** Check "Control audio via OBS" in the Audio section

2. **Configure Audio:**
   - In OBS Audio Mixer, find "Pomodoro Timer"
   - Set it to **"Monitor and Output"**
   - Adjust volume as needed

**Result:** Audio plays locally AND goes to stream through OBS!

### Option 2: Dual Audio - Backup Local Playback + OBS Capture

If "Monitor and Output" doesn't work and you need guaranteed local audio:

1. **Add Browser Source in OBS:**
   - Right-click in Sources → Add → Browser Source
   - Name it "Pomodoro Timer"
   - Check "Local file" and select `pomodoro.html`
   - Set width/height to your desired size (e.g., 800x400)
   - Check "Shutdown source when not visible"
   - **Important:** Check "Control audio via OBS" in the Audio section

2. **Configure Audio:**
   - In OBS Audio Mixer, you should now see "Pomodoro Timer" as an audio source
   - Enable it and adjust volume as needed
   - Set it to "Monitor and Output" so it goes to both your stream AND your local speakers

**Result:** You'll hear the sounds locally AND they'll go through your stream!

### Option 3: Browser Source with Audio Capture Only

1. **Add Browser Source in OBS:**
   - Right-click in Sources → Add → Browser Source
   - Name it "Pomodoro Timer"
   - Check "Local file" and select `pomodoro.html`
   - Set width/height to your desired size (e.g., 800x400)
   - Check "Shutdown source when not visible"
   - **Important:** Check "Control audio via OBS" in the Audio section

2. **Configure Audio:**
   - In OBS Audio Mixer, you should now see "Pomodoro Timer" as an audio source
   - Enable it and adjust volume as needed
   - Make sure it's set to "Monitor and Output" or "Monitor Only" depending on your setup

### Option 4: Media Source Approach (Alternative)

1. **Create Media Sources in OBS:**
   - Add 3 Media Sources for your sounds:
     - "Session Start" → `sessionstart.mp3`
     - "Session End" → `sessionend.mp3`
     - "Long Break" → `longbreak.mp3`
   - Set each to "Monitor and Output" in Audio Mixer
   - Configure them to restart playback when activated

2. **Add Timer Display:**
   - Add Browser Source pointing to `pomodoro-media.html`
   - Make it transparent (no audio needed for this source)

3. **Set up Scene Transitions:**
   - Create scenes or use source visibility to trigger the media sources
   - Use OBS hotkeys or conditional logic to show/hide media sources when timer events occur

## Troubleshooting

**Audio not working in stream:**
- For Browser Source: Ensure "Control audio via OBS" is checked
- For Media Source: Verify media sources are set to "Monitor and Output"
- Check OBS Audio Mixer settings
- Test with headphones to verify audio routing

**Timer not updating:**
- Browser sources may need refreshing when scene becomes active
- Check browser console for JavaScript errors

## Files
- `pomodoro.html` - Main timer with embedded audio (Browser Source version)
- `pomodoro-media.html` - Timer display only (Media Source version)
- `pomodoro-timer.js` - Timer logic
- Audio files: `sessionstart.mp3`, `sessionend.mp3`, `longbreak.mp3`, `528hz.mp3`

## Customization
Edit the timer values in the JavaScript:
- `workTime = 25*60` (25 minutes)
- `breakTime = 5*60` (5 minutes)
- `longBreakTime = 15*60` (15 minutes)
- `sessionNum = 4` (sessions before long break)
