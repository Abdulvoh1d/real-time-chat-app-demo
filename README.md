# Huddle — Real-Time Chat App (local demo)

A compact, responsive workspace-style chat interface built with plain HTML, CSS, and browser JavaScript. This is a **local interaction demo**, not a live chat service.

## What works in this demo

- Switch between `#general`, `#design`, `#product`, and `#weekend-plans`; each channel has its own conversation history.
- Read fictional sample messages with timestamps, then compose and add your own messages to the currently selected channel.
- Press **Enter** to add a message, or **Shift+Enter** to insert a new line. A character count and empty-message guard are included.
- Conversations persist in this browser's `localStorage`, so they remain after reloading this page in this browser. **Reset sample data** restores the fictional starting conversations after confirmation.
- On narrow screens, open and close the channel navigation using the menu button, close button, backdrop, or Escape key.

## Sample data and limitations

Names and pre-filled messages are fictional sample data. Messages you compose are saved only in this browser on this device. They are **not sent, delivered, synchronized, or visible to other people**. There is no WebSocket, server, account, or network connection. This demo does not provide real-time chat.

The reference technology list—**React, Node.js, Socket.IO, WebSocket**—describes a possible full-stack version only; none of those technologies or any network transport is connected by this no-build browser demo. This project uses no framework, package manager, external API, external script, remote asset, or network request. Browser storage may be unavailable in private/restricted contexts; in that case, messages may not persist after closing the page.

## Launch

Open a terminal in this folder and run:

```bash
python3 -m http.server 8765
```

Then open [http://localhost:8765](http://localhost:8765).
