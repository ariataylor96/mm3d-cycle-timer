import blessed from 'neo-blessed';

import Timer from './timer';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const main = async () => {
  const timer = new Timer();

  const screen = blessed.screen({
    smartCSR: true,
  });

  screen.title = 'MM3D Cycle Tracker';

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.key(['t'], timer.toggle);
  screen.key(['h'], timer.homeBuffer);
  screen.key(['u'], timer.undoHomeBuffer);

  const box = blessed.box({
    top: 'center',
    left: 'center',
    content: '',
    width: '100%',
    height: '100%',
    align: 'right',
    valign: 'middle',
    style: {
      fg: 'white',
      bg: 'black',
    },
  });

  const text = blessed.text({
    parent: box,
    top: 'center',
    left: 'center',
    align: 'center',
    style: {
      fg: 'white',
    },
  });

  screen.append(box);

  while (true) {
    if (!timer.running) {
      text.setContent('Press t to start the timer');
    }

    if (timer.running) {
      text.hidden = true;
    }

    box.style.bg = 'black';

    if (timer.inWrongWarpWindow) {
      box.style.bg = 'cyan';
    }

    if (timer.inZeroDayWindow) {
      box.style.bg = 'green';
    }

    screen.render();

    await sleep(25);
  }
};

main();
