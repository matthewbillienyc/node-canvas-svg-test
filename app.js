console.log('Starting SVG testing...');

const fs = require('fs');
const { createCanvas, Image } = require('canvas');

const canvas = createCanvas(400, 400);

const svgStrings = [`
<svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="font-family:RobotoCondensed;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <g class="translate" transform="translate(200,200)">
        <path fill="#6833c9" class="flag" d="M 16.5 10.5 A 10 10 0 1 1 16.499995000000418 10.49000000166666 Z M 6.5 20.5 L 6.5 29.531480378285778" stroke="#6833c9" stroke-width="1"></path>
    </g>
</svg>
`,
`
<svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style="font-family:RobotoCondensed;font-size:12px;" xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <g class="translate" transform="translate(200,200)">
        <path fill="#6833c9" class="flag" d="M 16.5 10.5 A 10 10 0 1 1 16.499995000000418 10 Z M 6.5 20.5 L 6.5 29.531480378285778" stroke="#6833c9" stroke-width="1"></path>
    </g>
</svg>
`
];

for (let i = 0; i < svgStrings.length; i += 1) {
    const bufferedSVG = new Buffer(svgStrings[i]);
    const image = new Image();
    image.src = bufferedSVG;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);

    const buffer = canvas.toBuffer();
    const fileName = `test-${i}.png`;
    fs.open(fileName, 'w', (err, fd) => {
        if (err) throw `Error opening file: ${err}`;
        fs.write(fd, buffer, 0, buffer.length, null, (err) => {
            if (err) throw `Error writing file: ${err}`;
            fs.close(fd, () => {
                console.log(`Successfully wrote ${fileName}`);
            });
        });
    });
}
