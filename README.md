# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Features

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Dark mode](assets/browser-ext-dark-mode.png)
![Light mode](assets/browser-ext-light-mode.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Browser extension manager](https://browser-extensions-manager-mu.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Data fetching and filtering
- Light and dark mode

### What I learned

- this was a revision on working with HTML, CSS and JavaScript  without any framework.

#### Error in mongoose and solution.

```js
Error fetching extensions: MongooseError: Operation `browser-extension-manager.find()` buffering timed out after 10000ms
    at Timeout.<anonymous> (C:\Users\chamu\Documents\GitHub\browser-extensions-manager\server\node_modules\mongoose\lib\drivers\node-mongodb-native\collection.js:187:23)
```

#### Solution

##### Change DNS Settings to Use Google DNS (8.8.8.8)

###### On Windows 10/11

- Open Network settings
  - Right-click the network icon in the system tray and select Open Network & Internet settings.
  - Click Change adapter options.
- Select Your Network Adapter:
  - Right-click your active network adapter (Wi-Fi or Ethernet) and choose Properties.
- Change DNS Server:
  - Select Internet Protocol Version 4 (TCP/IPv4) and click Properties.
  - Choose Use the following DNS server addresses.
  - Enter:
    - Preferred DNS server: 8.8.8.8
    - Alternate DNS server: 8.8.4.4
  - Click OK to save.
- Restart Network Connection:
  - Disable and re-enable the adapter or restart your computer.

### Continued development

### Useful resources

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Acknowledgments
