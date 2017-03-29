# Pretty FigCaptions

A quite simple bit of JavaScript to grab the 'average' color of an image and apply it as a background to the caption.

No plugins, no preprocessors, no transpilers, no npm, no frameworks no fluff. Just simple vanilla JavaScript.

## Getting started

Include the JavaScript in the footer and attach scroll progress to document body:

```html
<script src="PrettyFigcaptions.js"></script>
```
```js
window.onload = PrettyFigcaps();
```

And there it is!
You may notice, depending on the image loaded, that the color of the caption changes to white. This is just a little helper that detects if a background color is dark.
If you prefer full control, you can turn this off by adding a parameter of ```false``` to the load function:

```js
window.onload = PrettyFigcaps(false);
```

## Future additions

Improve the speed on paint so there is no jank.
Add ability to choose 'dominant' or 'focus' color while maintaining tiny size. Mean, mode, median!

### License

PetitePageProgress is MIT Licensed

Copyright (c) 2017 @moosch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
