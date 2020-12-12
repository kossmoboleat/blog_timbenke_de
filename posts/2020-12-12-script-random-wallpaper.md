---
title: Script to Assign a Random Wallpaper to each Screen
date: 2020-12-12
summary: There are many nice wallpapers around, but I often find them to be too impersonal and sterile. Unsplash for example has technically great images which don't inspire me. Over time, I've started collecting my favorite images of mostly public domain paintings and a few drawings. To vary the images from time to time I've created this script that chooses them randomly and assigns different ones to all my displays.      
---

The whole script with dependencies is on [github](https://github.com/kossmoboleat/random-wallpaper-file/). It uses a cross-platform npm dependency [wallpaper](https://www.npmjs.com/package/wallpaper) that does the actual work of switching the wallpaper for a specific screen. The same library can also figure out how many screens are currently available.

As described in my [bluetooth post](../bluetooth-device-toggle-via-menubar/) there's a small nice script called [appify.sh](https://mathiasbynens.be/notes/shell-script-mac-apps) that you can use to create "proper" macOs apps from this that you can trigger with an app launch such as Alfred.

```javascript
//Grabs a random index between 0 and length
function randomIndex(length) {
  return Math.floor(Math.random() * (length));
}

function getRandomImages(imageDir, numberOfFiles) {
  //Read the directory and get the files
  const dirs = fs.readdirSync(imageDir)
  .filter(fileName =>
      fileName.toLowerCase().endsWith("png") ||
      fileName.toLowerCase().endsWith("jpg") ||
      fileName.toLowerCase().endsWith("jpeg"))
  .map(file => path.join(imageDir, file));

  const chosenImages = [];
  const hashCheck = {}; //used to check if the file was already added to chosenImages

  //While we haven't got the number of files we want. Loop.
  while (chosenImages.length < numberOfFiles) {
    const fileIndex = randomIndex(dirs.length - 1);

    //Check if the file was already added to the array
    if (hashCheck[fileIndex] === true) {
      continue; //Already have that file. Skip it
    }

    //Add the file to the array and object
    chosenImages.push(dirs[fileIndex]);
    hashCheck[fileIndex] = true;
  }

  return chosenImages;
}

const main = async () => {
  const imageDir = process.argv[2];
  if (!imageDir) {
    console.error('Please specify image directory as argument!');
    return;
  }

  const numberOfScreens = (await wallpaper.screens()).length;

  const randomImages = getRandomImages(imageDir, numberOfScreens);

  for (const filePath of randomImages) {
    const screenIndex = randomImages.indexOf(filePath);
    console.log(screenIndex, filePath);
    await wallpaper.set(filePath, {screen: screenIndex});
  }
};
```

I have another script that sets all desktop backgrounds to solid black when I'm watching a video and want to remove distractions from the other screens with the [wallpaper](https://formulae.brew.sh/formula/wallpaper) CLI tool installed via homebrew:

```shell
#! /usr/bin/env zsh

wallpaper set-solid-color 000000
```

See the scripts in action here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/yIPGOhJ9LMQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
