# Node Canvas SVG to PNG issue
So this repo is to show how between `node-canvas` versions `2.0.0-alpha.181` and `2.1.0` a bug with rendering SVG arcs was introduced. 

###### Environment Info
```
Ubuntu 18.04
Nodejs 6.11.0
```

##### Required Repo Setup
1. Download [Docker](https://docs.docker.com/) for your development machine([Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/))
2. Clone the repo via: 
      ```
      cd ~
      git clone git@github.com:matthewbillienyc/node-canvas-svg-test.git
      ```

##### How to test
Once docker is installed and repo is checked out run the following commands to test.

###### Test node-canvas 2.0.0-alpha.18
```
cd ~/node-canvas-svg-test
git checkout 2.0.0-alpha.18
docker-compose up
```
Open the png image that is created and you should see that it looks correct.
![Imgur](https://i.imgur.com/Slw4Wvf.png)

###### Test node-canvas 2.1.0
```
cd ~/node-canvas-svg-test
git checkout 2.1.0
docker-compose up
```
Open the png image that is created and you should see that it **does not look correct.**
![Imgur](https://i.imgur.com/vH4nOcm.png)

###### SVG data
Here is an [online SVG rendering](https://codepen.io/KFoxder/pen/bZEJmW) of the SVG data below. The offending data is this: `A 10 10 0 1 1 16.499995000000418 10.49000000166666`. Specifically it looks like the `10.49000000166666` in the arc path is what causes it to break.
```svg
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="font-family:RobotoCondensed;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
        <g class="translate" transform="translate(200,200)">
            <path fill="#6833c9" class="flag" d="M 16.5 10.5 A 10 10 0 1 1 16.499995000000418 10.49000000166666 Z M 6.5 20.5 L 6.5 29.531480378285778" stroke="#6833c9" stroke-width="1"></path>
        </g>
    </svg>
```

###### Why is it breaking? Great question!

I am not 100% sure. But we spent some time looking into by comparing all the [commits](https://github.com/Automattic/node-canvas/compare/586b395afb4a7...a5921f6#diff-d52111b9458a13e196dab8299f822c29R2509) between `2.0.0-alpha.18` and `2.1.0`. You will see that it looks like this Pull Request ([`1288: Adapt to V8 7.0`](https://github.com/Automattic/node-canvas/pull/1288)) is the offending change. More specifically I believe it is [these lines in CanvasRenderingContext2d.cc](https://github.com/Automattic/node-canvas/blob/master/src/CanvasRenderingContext2d.cc#L2813-L2826) that caused the breaking of the arc path.
