# WebRTC Testing Guide

## Quick Start Testing

### 1. Start the Application
```bash
# Terminal 1 - Start Server
cd server
npm install
npm run dev

# Terminal 2 - Start Client  
cd client
npm install
npm run dev
```

### 2. Open Two Browser Windows
- Window 1: `http://localhost:5173`
- Window 2: `http://localhost:5173` (incognito/private mode recommended)

### 3. Join Same Room
- Both windows: Enter same room ID (e.g., "test123")
- Both windows: Enter different usernames
- First user is auto-admitted (admin)
- Second user needs admission (admin clicks "Admit")

## Test Scenarios

### Scenario 1: Basic Audio Test 🎤
1. Window 1: Click microphone button (should turn blue)
2. Window 2: Click microphone button
3. ✅ **Expected**: Both users can hear each other
4. Window 1: Click microphone again (should turn red)
5. ✅ **Expected**: Window 2 can't hear Window 1, sees mute indicator

### Scenario 2: Basic Video Test 📹
1. Window 1: Click camera button (should turn blue)
2. ✅ **Expected**: 
   - Window 1 sees own video in grid (mirrored)
   - Window 2 sees Window 1's video
3. Window 2: Click camera button
4. ✅ **Expected**:
   - Both see each other's videos
   - Video grid shows 2 participants
5. Window 1: Click camera again
6. ✅ **Expected**:
   - Window 1 shows avatar instead of video
   - Window 2 still shows own video

### Scenario 3: Screen Sharing Test 🖥️
1. Window 1: Turn on camera and audio
2. Window 1: Click screen share button (should turn green)
3. Browser: Select screen/window/tab
4. ✅ **Expected**:
   - Window 1 sees screen preview
   - Window 2 sees Window 1's screen
   - Camera still works (both screens visible)
5. Window 1: Click screen share again
6. ✅ **Expected**:
   - Screen sharing stops for both
   - Camera still works

### Scenario 4: Multi-User Test 👥
1. Open 3 browser windows
2. All join same room with different names
3. Window 1 (admin): Admit Window 2 and 3
4. All: Turn on camera
5. ✅ **Expected**:
   - All see 3 videos in grid (2 columns layout)
   - Grid is scrollable if needed
6. Window 2: Start screen sharing
7. ✅ **Expected**:
   - All see Window 2's screen
   - All cameras still visible

### Scenario 5: Join Mid-Call Test 🚪
1. Window 1: Turn on camera and audio
2. Window 2: Turn on camera and audio
3. ✅ **Expected**: Both see each other
4. Window 3: Join room (new user)
5. Window 1: Admit Window 3
6. ✅ **Expected**:
   - Window 3 immediately sees Window 1 and 2
   - Windows 1 and 2 see Window 3
   - All media streams work

### Scenario 6: Disconnect Test 🔌
1. 3 users in call with video
2. Window 2: Close browser tab
3. ✅ **Expected**:
   - Windows 1 and 3 see "User 2 disconnected"
   - Window 2 removed from video grid
   - Remaining videos still work
4. Window 2: Rejoin room
5. ✅ **Expected**: Can rejoin and see others

### Scenario 7: Rapid Toggle Test ⚡
1. Window 1: Rapidly click camera 5 times (on/off/on/off/on)
2. ✅ **Expected**:
   - Final state is camera ON
   - No duplicate streams
   - Window 2 sees correct state
3. Window 1: Rapidly toggle screen share 3 times
4. ✅ **Expected**:
   - Final state matches button color
   - No ghost screens
   - Clean toggling

### Scenario 8: Permission Denied Test 🚫
1. Window 1: Deny camera permission when prompted
2. ✅ **Expected**:
   - Toast: "Could not access camera/microphone"
   - Button stays grey
   - No errors in console
3. Window 1: Grant permission in browser settings
4. Window 1: Click camera button again
5. ✅ **Expected**: Camera works now

### Scenario 9: Screen Share Cancel Test ❌
1. Window 1: Click screen share button
2. Browser picker: Click "Cancel"
3. ✅ **Expected**:
   - No error toast (user cancelled)
   - Button stays grey
   - Window 2 sees no screen

### Scenario 10: Browser UI Stop Test 🛑
1. Window 1: Start screen sharing
2. ✅ **Expected**: Browser shows "Sharing screen" indicator
3. Browser: Click "Stop sharing" in browser UI
4. ✅ **Expected**:
   - Screen share button turns grey
   - Window 2 stops seeing screen
   - Camera still works if it was on

## Verification Checklist

### Visual Indicators
- [ ] Microphone: Blue when on, Red when muted
- [ ] Camera: Blue when on, Red when off
- [ ] Screen Share: Green when sharing, Grey when not
- [ ] Mute indicator: Red mic icon on muted users
- [ ] Screen indicator: Desktop icon on screen sharers
- [ ] Username labels: Correct names shown
- [ ] "You" label: Shows on local video
- [ ] Avatar: Shows when camera off

### Audio Quality
- [ ] Clear audio, no echo
- [ ] Low latency (< 300ms)
- [ ] No audio cutting
- [ ] Volume levels good
- [ ] Mute works instantly

### Video Quality
- [ ] Clear video (720p)
- [ ] Smooth framerate (~30fps)
- [ ] Local video mirrored
- [ ] Remote video not mirrored
- [ ] No freezing
- [ ] Aspect ratio correct

### Screen Share Quality
- [ ] Text readable
- [ ] Smooth updates
- [ ] Mouse cursor visible
- [ ] Color accuracy
- [ ] Full screen captured

### UI/UX
- [ ] Tooltips show on hover
- [ ] Buttons respond instantly
- [ ] Toast notifications clear
- [ ] Grid layout responsive
- [ ] Minimize/expand works
- [ ] Scrollbar appears when needed

### Performance
- [ ] No memory leaks (check task manager)
- [ ] CPU usage reasonable (<50%)
- [ ] Network usage stable
- [ ] No browser crashes
- [ ] Smooth animations

## Browser-Specific Tests

### Chrome/Edge
- [ ] All features work
- [ ] DevTools show no errors
- [ ] Network tab shows ICE candidates

### Firefox
- [ ] All features work
- [ ] Screen share picker looks correct
- [ ] No console warnings

### Safari
- [ ] Camera/mic permissions work
- [ ] Screen share requires macOS 12.3+
- [ ] Video formats compatible

## Network Scenarios

### Good Connection (>10 Mbps)
- [ ] HD video works
- [ ] Screen share smooth
- [ ] No lag

### Medium Connection (2-10 Mbps)
- [ ] Video quality adapts
- [ ] Still usable
- [ ] Audio prioritized

### Poor Connection (<2 Mbps)
- [ ] Audio still works
- [ ] Video may freeze
- [ ] Connection stays alive

## Error Testing

### Intentional Errors
1. Disconnect internet mid-call
   - ✅ Connection tries to reconnect
   
2. Block WebRTC in browser settings
   - ✅ Graceful error message

3. Use camera in another app
   - ✅ "Device in use" error

4. Revoke permission mid-call
   - ✅ Media stops gracefully

## Console Logging

### Expected Logs (Normal Operation)
```
✅ Received remote track from abc123, kind: audio
✅ Received remote track from abc123, kind: video
✅ ICE connection state with abc123: connected
✅ Connection state with abc123: connected
✅ Sent offer to abc123
✅ Sent answer to abc123
```

### Warning Logs (Acceptable)
```
⚠️ Track unmuted for abc123, kind: audio
⚠️ Replacing video track for abc123
⚠️ Screen track obtained: screen-share-1699999999999
```

### Error Logs (Investigation Needed)
```
❌ Error accessing media devices: NotAllowedError
❌ Error handling offer: [error details]
❌ Connection state with abc123: failed
❌ ICE connection state with abc123: failed
```

## Performance Metrics

### Target Metrics
- **Time to First Video**: < 2 seconds
- **Audio Latency**: < 300ms
- **Video FPS**: ~30fps
- **Connection Setup**: < 3 seconds
- **ICE Gathering**: < 5 seconds

### Measure Performance
```javascript
// In browser console
performance.getEntriesByType('navigation')
performance.getEntriesByType('resource')
```

## Debugging Commands

### Check WebRTC Stats
```javascript
// In browser console
const pc = document.querySelector('video').__proto__.srcObject?.getTracks()[0]
pc?.getStats().then(stats => console.log(stats))
```

### Check Active Connections
```javascript
// In server console
console.log('Active users:', userSocketMap.length)
console.log('Active rooms:', roomAdmins.size)
```

### Enable Verbose Logging
```javascript
// In browser console
localStorage.setItem('debug', '*')
```

## Test Report Template

```markdown
## WebRTC Test Report

**Date**: [Date]
**Tester**: [Name]
**Browser**: [Chrome/Firefox/Safari] [Version]
**OS**: [Windows/Mac/Linux]

### Scenarios Tested
- [ ] Scenario 1: Audio
- [ ] Scenario 2: Video
- [ ] Scenario 3: Screen Share
- [ ] Scenario 4: Multi-User
- [ ] Scenario 5: Join Mid-Call
- [ ] Scenario 6: Disconnect
- [ ] Scenario 7: Rapid Toggle
- [ ] Scenario 8: Permission Denied
- [ ] Scenario 9: Screen Share Cancel
- [ ] Scenario 10: Browser UI Stop

### Issues Found
1. [Issue description]
   - **Severity**: High/Medium/Low
   - **Steps to Reproduce**: [steps]
   - **Expected**: [expected behavior]
   - **Actual**: [actual behavior]

### Performance Notes
- Connection speed: [speed]
- CPU usage: [percentage]
- Memory usage: [MB]
- Video quality: [rating]
- Audio quality: [rating]

### Overall Assessment
✅ Pass / ❌ Fail

### Notes
[Additional observations]
```

## Automated Testing (Future)

```javascript
// Example Playwright test
test('video call works', async ({ page, context }) => {
    // Open two pages
    const page1 = page
    const page2 = await context.newPage()
    
    // Join room
    await page1.goto('http://localhost:5173')
    await page1.fill('[name="roomId"]', 'test')
    await page1.click('button:text("Join")')
    
    // Enable video
    await page1.click('[aria-label*="camera"]')
    
    // Verify video element exists
    const video = await page1.locator('video')
    expect(await video.count()).toBeGreaterThan(0)
})
```

---

## Quick Commands

```bash
# Start both client and server
npm run dev

# Check for TypeScript errors
npm run type-check

# Build for production
npm run build

# Run linter
npm run lint
```

## Support

If you encounter issues:
1. Check browser console for errors
2. Check server logs
3. Verify camera/mic permissions
4. Try different browser
5. Check firewall/network settings
6. Review `WEBRTC_FIXES_SUMMARY.md`

---

**Happy Testing!** 🎉
