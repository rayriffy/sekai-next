Welcome to **Sekai Wiki** this site is the place where you can look and observe the data of the game **Project Sekai: Colorful Stage feat. Hatsune Miku** like cards, events, and so on.

The work is still in progress though but it will keep improving overtime.

Contributing
---

If you're devs, you can contributing to this project on [GitHub](https://github.com/rayriffy/sekai-next) as well.

Credits
---

I would like to shout out to the team of [Sekai Viewer](https://github.com/Sekai-World) for providing assets and data to make this site possible.

Techonology Stack
---

This site is built with [Next](https://nextjs.org) and deployed on [Vercel](https://vercel.com) to maximize the capabilities of **Next** itself

- All of the data are static, so I use **Static Generation** to cooked all of the data on build time, so there will not be any waiting time for the data to process
- Most of image assets are already served in **WebP** form CDN though, but file sizes can still be able to improve. So, thanks to the major update of [Next 10](https://nextjs.org/blog/next-10) I am able to use **Automatic Image Optimization** to optimize and cache optimized image on-the-fly. (This will help to reduce CDN bandwidth as well because when image has been requested once, it will pull data from cache instead for the second time.)
- **(This is not included at this moment)** This site is offline-ready, if your browser supports [Service Worker](https://caniuse.com/serviceworkers)
