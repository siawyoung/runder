runder
======
[siawyoung.github.io/runder](http://siawyoung.github.io/runder)

Runder is a personal 24-hour challenge to create a replica of CodePen, i.e. online sandboxing.

Runder leverages on [Google Caja's](https://code.google.com/p/google-caja/) cajoling to "tame" user-submitted code before it is executed. Syntax highlighting and (minimal) autocomplete is accomplished with [Ace](http://ace.c9.io/#nav=about).

### Usage

With Runder I wanted to focus on a mouse-less experience (something like Vim, but no `hjkl` navigation). Each of the tabs can be toggled with `1`, `2`, `3` and `4` and each tab can be focused with `q`, `w`, `e`, while your code can be run with `r` (without focus) or `ctrl`/`cmd`+`enter` (global binding). Finally, `esc` allows global unfocus.

### Reflection

While working on Runder, there were several issues I faced:

1. How to protect against malicious code
	- This issue took me really long to figure out, due to the immense breadth of web security issues involved (and the inherent flaws of JavaScript as a language). Given only 24 hours, I knew I had to rely heavily on a hopefully mature library. Even Googling was unfruitful initially, and I almost gave up until I came across Google Caja. Reading the introduction I knew my scenario fell somewhere within its use cases, so I proceeded to integrate Caja with Runder. When code is run on Runder, Runder sends the code to a Caja server (hosted on Google) for "taming", before the code is returned and displayed in the results pane.
2. Keyboard bindings
	- I've always disliked mouse-heavy coding environments, but most editors that focus solely on keyboard bindings have learning curves that are far too steep (I'm looking at you, Vim and Emacs). Given this project's limited scope, I toyed with the possibility of it being a pure keyboard-binding environment. I think I ended up with a solution that isn't too unintuitive from the get-go. Give it a try and let me know! (the key bindings are above) 

I've also had Sketch for a while now and finally had a go at it yesterday to design an icon for Runder. The experience was awesome - I'll try prototyping a full web page with it the next time round.

### TODO
- Download feature
- Encoded URLs for sharing
- Library inclusion (Bootstrap, jQuery)